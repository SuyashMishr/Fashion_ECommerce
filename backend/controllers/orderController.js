const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const paymentController = require('./paymentController');

// placeOrder = async (req, res) => {
//     try {
//         const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

//         // Validate items
//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ message: 'Order must have at least one item.' });
//         }

//         if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
//             return res.status(400).json({ message: 'Valid shipping address required.' });
//         }

//         if (!billingAddress) {
//             return res.status(400).json({ message: 'Billing address is required.' });
//         }

//         if (!paymentMethod) {
//             return res.status(400).json({ message: 'Payment method is required.' });
//         }

//         // Build order items with price snapshot
//         const orderItems = await Promise.all(items.map(async (item) => {
//             if (!mongoose.Types.ObjectId.isValid(item.product)) {
//                 throw new Error(`Invalid product ID: ${item.product}`);
//             }

//             const product = await Product.findById(item.product);
//             if (!product) {
//                 throw new Error(`Product not found: ${item.product}`);
//             }

//             if (item.quantity <= 0) {
//                 throw new Error(`Invalid quantity for product: ${product.title}`);
//             }

//             return {
//                 product: product._id,
//                 seller: product.seller,
//                 quantity: item.quantity,
//                 price: product.price,
//             };
//         }));

//         // Create order
//         const order = new Order({
//             buyer: req.user._id,
//             items: orderItems,
//             shippingAddress,
//             billingAddress,
//             payment: { method: paymentMethod },
//             pricing: {},
//         });

//         // Calculate totals before saving
//         order.calculateTotals();

//         await order.save();

//         return res.status(201).json({ message: 'Order placed successfully', order });
//     } catch (error) {
//         return res.status(400).json({ message: error.message });
//     }
// };


placeOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

        // Basic validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing Razorpay payment details." });
        }

        // Call the Razorpay verification + order creation function
        return await paymentController.verifyPaymentAndPlaceOrder(req, res, orderData);

    } catch (error) {
        console.error("Order placement error", error);
        return res.status(500).json({ message: error.message });
    }
};

getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate('items.product', 'title price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

getSellerOrders = async (req, res) => {
    try {
        // Find orders containing items sold by this seller
        const orders = await Order.find({ 'items.seller': req.user._id })
            .populate('buyer', 'name email')
            .populate('items.product', 'title price')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, note } = req.body;

        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Only sellers can update status of orders containing their items
        if (req.user.role === 'seller') {
            const sellerItem = order.items.find(item => item.seller.toString() === req.user._id.toString());
            if (!sellerItem) {
                return res.status(403).json({ message: 'You are not authorized to update this order.' });
            }
        } else {
            return res.status(403).json({ message: 'Only sellers can update order status.' });
        }

        order.updateStatus(status, note, req.user._id);
        await order.save();

        res.json({ message: 'Order status updated.', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const trackOrder = async (req, res) => {
    const userId = req.user._id;
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
        .populate('items.product', 'title price')
        .populate('items.seller', 'name email')
        .populate('buyer', 'name email');

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    // Ownership/access check
    // Buyer can only access own orders
    if (req.user.role === 'buyer' && !order.buyer.equals(userId)) {
        return res.status(403).json({ message: 'Access denied: not your order' });
    }

    // Seller can access only if seller of any item in the order
    if (req.user.role === 'seller' &&
        !order.items.some(item => item.seller.equals(userId))) {
        return res.status(403).json({ message: 'Access denied: not your order' });
    }

    // If you want to add admin later, you can skip checks for them here.

    return res.json({
        orderId: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        statusHistory: order.statusHistory,
        placedAt: order.placedAt,
        shippedAt: order.shipping?.shippedAt,
        deliveredAt: order.shipping?.deliveredAt,
        buyer: {
            name: order.buyer?.name,
            email: order.buyer?.email,
        },
        items: order.items.map(item => ({
            title: item.product.title,
            price: item.price,
            quantity: item.quantity,
            seller: item.seller?.name,
        })),
    });
};


module.exports = {
    placeOrder,
    getUserOrders,
    getSellerOrders,
    updateOrderStatus,
    trackOrder
};