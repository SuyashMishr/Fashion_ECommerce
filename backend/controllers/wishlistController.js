const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// Add to wishlist
const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [] });
        }

        await wishlist.addProduct(productId);
        logger.info(`User ${userId} added product ${productId} to wishlist`);
        res.status(200).json({ success: true, message: 'Added to wishlist', data: wishlist });
    } catch (err) {
        logger.error('Add to wishlist error:', err);
        next(err);
    }
};

// Remove from wishlist
const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        await wishlist.removeProduct(productId);

        logger.info(`User ${userId} removed product ${productId} from wishlist`);
        res.status(200).json({ success: true, message: 'Removed from wishlist' });
    } catch (err) {
        logger.error('Remove from wishlist error:', err);
        next(err);
    }
};

//  Get user's wishlist
const getWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product');

        if (!wishlist) {
            return res.status(200).json({ success: true, data: [] });
        }

        const productList = wishlist.products.map((p) => ({
            ...p.product._doc,
            addedAt: p.addedAt
        }));

        res.status(200).json({ success: true, data: productList });
    } catch (err) {
        logger.error('Get wishlist error:', err);
        next(err);
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
