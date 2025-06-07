const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// ✅ Add to wishlist
const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [productId] });
        } else {
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ success: false, message: 'Product already in wishlist' });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        logger.info(`User ${userId} added product ${productId} to wishlist`);
        res.status(200).json({ success: true, message: 'Added to wishlist', data: wishlist });
    } catch (err) {
        logger.error('Add to wishlist error:', err);
        next(err);
    }
};

// ❌ Remove from wishlist
const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        // Check if the product exists
        const productExists = await Product.exists({ _id: productId });
        if (!productExists) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }

        // Remove product from wishlist if present
        const initialLength = wishlist.products.length;
        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);

        if (wishlist.products.length === initialLength) {
            // Product was not in wishlist
            return res.status(400).json({ success: false, message: 'Product not found in wishlist' });
        }

        await wishlist.save();

        logger.info(`User ${userId} removed product ${productId} from wishlist`);
        res.status(200).json({ success: true, message: 'Removed from wishlist' });
    } catch (err) {
        logger.error('Remove from wishlist error:', err);
        next(err);
    }
};

// 📦 Get user's wishlist
const getWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        if (!wishlist) return res.status(200).json({ success: true, data: [] });

        res.status(200).json({ success: true, data: wishlist.products });
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
