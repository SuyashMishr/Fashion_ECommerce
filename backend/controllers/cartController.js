const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

// Add product to cart
addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity }]
            });
        } else {
            const existingItem = cart.items.find(item => item.product.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
            await cart.save();
        }

        logger.info(`Product ${productId} added to cart by user ${req.user._id}`);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        logger.error('Add to cart error:', error);
        next(error);
    }
};

// Increase quantity
increaseQty = async (req, res, next) => {
    try {
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.items.find(item => item.product.toString() === productId);
        if (item) {
            item.quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        logger.info(`Increased quantity of product ${productId} in cart`);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        logger.error('Increase quantity error:', error);
        next(error);
    }
};

// Decrease quantity (remove item if 0)
decreaseQty = async (req, res, next) => {
    try {
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not in cart' });
        }

        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        logger.info(`Decreased quantity of product ${productId} in cart`);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        logger.error('Decrease quantity error:', error);
        next(error);
    }
};

// Remove product from cart
removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { product: productId } } },
            { new: true }
        );

        logger.info(`Product ${productId} removed from cart by user ${req.user._id}`);
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        logger.error('Remove from cart error:', error);
        next(error);
    }
};


// Clear cart
clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $set: { items: [] } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        logger.info(`Cart cleared for user ${req.user._id}`);
        res.status(200).json({ success: true, message: 'Cart cleared' });
    } catch (error) {
        logger.error('Clear cart error:', error);
        next(error);
    }
};

// Get user's cart
getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json({ success: true, data: cart || { items: [] } });
    } catch (error) {
        logger.error('Get cart error:', error);
        next(error);
    }
};


module.exports = {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    getCart,
};