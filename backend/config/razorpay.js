const Razorpay = require('razorpay');
const logger = require('../utils/logger');

// Ensure Razorpay credentials are set
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
    logger.error('Razorpay credentials are not defined in environment variables.');
    throw new Error('Missing Razorpay credentials');
}

/**
 * Initializes and exports a Razorpay instance
 * used for payment processing.
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

logger.info('Razorpay instance initialized successfully.');

module.exports = razorpay;
