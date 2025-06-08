const mongoose = require("mongoose");
const Review = require("../models/Review");
const Product = require("../models/Product");
const logger = require("../utils/logger");

const updateProductRating = async (productId) => {
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            numReviews: 0,
        });
        logger.info(`Updated product ${productId} rating: 0 (0 reviews)`);
        return;
    }

    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, {
        averageRating: avg.toFixed(1),
        numReviews: reviews.length,
    });

    logger.info(`Updated product ${productId} rating: ${avg.toFixed(1)} (${reviews.length} reviews)`);
};

exports.addOrUpdateReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            logger.warn(`Invalid product ID: ${productId}`);
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            logger.warn(`Invalid rating: ${rating}`);
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            logger.warn(`Product not found: ${productId}`);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const existing = await Review.findOne({ product: productId, user: userId });

        if (existing) {
            existing.rating = rating;
            existing.comment = comment;
            await existing.save();
            logger.info(`Review updated by user ${userId} for product ${productId}`);
        } else {
            await Review.create({ product: productId, user: userId, rating, comment });
            logger.info(`New review added by user ${userId} for product ${productId}`);
        }

        await updateProductRating(productId);
        res.status(200).json({ success: true, message: "Review saved." });

    } catch (err) {
        logger.error("Error in addOrUpdateReview:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            logger.warn(`Invalid review ID: ${reviewId}`);
            return res.status(400).json({ success: false, message: "Invalid review ID." });
        }

        const review = await Review.findOneAndDelete({
            _id: reviewId,
            user: req.user._id,
        });

        if (!review) {
            logger.warn(`Review not found or unauthorized delete attempt: ${reviewId}`);
            return res.status(404).json({ success: false, message: "Review not found or not authorized." });
        }

        await updateProductRating(review.product);
        logger.info(`Review deleted by user ${req.user._id} for product ${review.product}`);
        res.status(200).json({ success: true, message: "Review deleted." });

    } catch (err) {
        logger.error("Error in deleteReview:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getReviewsForProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            logger.warn(`Invalid product ID for reviews: ${productId}`);
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            logger.warn(`Product not found for review fetch: ${productId}`);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        const reviews = await Review.find({ product: productId }).populate("user", "name email");

        logger.info(`Fetched ${reviews.length} reviews for product ${productId}`);
        res.status(200).json({ success: true, reviews });

    } catch (err) {
        logger.error("Error in getReviewsForProduct:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
