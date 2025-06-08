const razorpay = require('./config/razorpay');
const crypto = require('crypto');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');
const mongoose = require('mongoose');
const emailService = require('./services/emailService');

exports.createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({ success: false, message: "Amount is required" });
        }

        const options = {
            amount: amount * 100, // Razorpay works in paise
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log(order);
        return res.status(200).json({ order });
    } catch (error) {
        console.error("Razorpay order creation failed:", error);
        return res.status(500).json({ message: "Failed to create Razorpay order", error });
    }
};


exports.verifyPaymentAndPlaceOrder = async (req, res, orderData) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const buyerId = req.user._id;

        // 1. Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // 2. Validate and prepare order items
        const orderItems = await Promise.all(orderData.items.map(async (item) => {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                throw new Error(`Invalid product ID: ${item.product}`);
            }

            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            if (item.quantity <= 0) {
                throw new Error(`Invalid quantity for product: ${product.title}`);
            }

            return {
                product: product._id,
                seller: product.seller,
                quantity: item.quantity,
                price: product.price,
            };
        }));

        // 3. Create and save order
        const order = new Order({
            buyer: buyerId,
            items: orderItems,
            shippingAddress: orderData.shippingAddress,
            billingAddress: orderData.billingAddress,
            payment: {
                method: orderData.paymentMethod,
                status: "paid",
                transactionId: razorpay_payment_id,
                paidAt: new Date(),
            },
            pricing: {},
        });

        order.calculateTotals();
        await order.save();

        // Send order confirmation email
        try {
            const user = await User.findById(req.user._id).select('name email');
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            await emailService.sendOrderConfirmationEmail(user.email, order, user.name);
        } catch (error) {
            console.error('Failed to send order confirmation email:', error);
            // Don’t block the response if email fails
        }


        return res.status(201).json({ success: true, message: "Order placed successfully", order });

    } catch (err) {
        console.error("Payment/order error", err);
        return res.status(500).json({ success: false, message: err.message || "Internal server error" });
    }
};