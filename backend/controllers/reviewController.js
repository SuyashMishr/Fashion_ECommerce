const mongoose = require("mongoose");
const Review = require("../models/Review");
const Product = require("../models/Product");
const logger = require("../utils/logger");


//Utility method to calculate and update the average rating and number of reviews for a given product based on its existing reviews.
const updateProductRating = async (productId) => {
    // Fetch all reviews for the product
    const reviews = await Review.find({ product: productId });

    // If no reviews, set averageRating and numReviews to zero
    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, {
            averageRating: 0,
            numReviews: 0,
        });
        logger.info(`Updated product ${productId} rating: 0 (0 reviews)`);
        return;
    }

     // Calculate average rating from all reviews
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    // Update product document with new average rating and total reviews count
    await Product.findByIdAndUpdate(productId, {
        averageRating: avg.toFixed(1),
        numReviews: reviews.length,
    });

    logger.info(`Updated product ${productId} rating: ${avg.toFixed(1)} (${reviews.length} reviews)`);
};

/*
Adds a new review or updates an existing review by the user for a product.
Also updates the product's rating after adding/updating the review.
*/
exports.addOrUpdateReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id;

        // Validate productId format
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            logger.warn(`Invalid product ID: ${productId}`);
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

        // Validate rating value range
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            logger.warn(`Invalid rating: ${rating}`);
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5." });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            logger.warn(`Product not found: ${productId}`);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Check if the user already reviewed the product
        const existing = await Review.findOne({ product: productId, user: userId });

        if (existing) {
            // Update existing review
            existing.rating = rating;
            existing.comment = comment;
            await existing.save();
            logger.info(`Review updated by user ${userId} for product ${productId}`);
        } else {
            // Create new review
            await Review.create({ product: productId, user: userId, rating, comment });
            logger.info(`New review added by user ${userId} for product ${productId}`);
        }

        // Update product rating after review changes
        await updateProductRating(productId);
        res.status(200).json({ success: true, message: "Review saved." });

    } catch (err) {
        logger.error("Error in addOrUpdateReview:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};



/**
 * Deletes a review by reviewId if it belongs to the logged-in user.
 * Updates the product's rating after deletion.
 */
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            logger.warn(`Invalid review ID: ${reviewId}`);
            return res.status(400).json({ success: false, message: "Invalid review ID." });
        }

        // Attempt to delete review owned by logged-in user
        const review = await Review.findOneAndDelete({
            _id: reviewId,
            user: req.user._id,
        });

        if (!review) {
            logger.warn(`Review not found or unauthorized delete attempt: ${reviewId}`);
            return res.status(404).json({ success: false, message: "Review not found or not authorized." });
        }

        // Update product rating after deletion
        await updateProductRating(review.product);
        logger.info(`Review deleted by user ${req.user._id} for product ${review.product}`);
        res.status(200).json({ success: true, message: "Review deleted." });

    } catch (err) {
        logger.error("Error in deleteReview:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * Retrieves all reviews for a given product.
 * Populates user details (name and email) for each review.
 */
exports.getReviewsForProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            logger.warn(`Invalid product ID for reviews: ${productId}`);
            return res.status(400).json({ success: false, message: "Invalid product ID." });
        }

         // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            logger.warn(`Product not found for review fetch: ${productId}`);
            return res.status(404).json({ success: false, message: "Product not found." });
        }

         // Fetch reviews and populate user info (name, email)
        const reviews = await Review.find({ product: productId }).populate("user", "name email");

        logger.info(`Fetched ${reviews.length} reviews for product ${productId}`);
        res.status(200).json({ success: true, reviews });

    } catch (err) {
        logger.error("Error in getReviewsForProduct:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
