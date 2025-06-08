const { body, param } = require('express-validator');

// Validation for place order
const placeOrderValidation = [
    body('items')
        .isArray({ min: 1 }).withMessage('Items must be an array with at least one item'),
    body('items.*.product')
        .isMongoId().withMessage('Product ID must be a valid Mongo ID'),
    body('items.*.quantity')
        .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),

    body('shippingAddress.street').notEmpty().withMessage('Shipping street is required'),
    body('shippingAddress.city').notEmpty().withMessage('Shipping city is required'),
    body('shippingAddress.state').optional().isString(),
    body('shippingAddress.country').optional().isString(),
    body('shippingAddress.pinCode').optional().isString(),
    body('shippingAddress.phoneNumber').optional().isString(),

    body('billingAddress.street').notEmpty().withMessage('Billing street is required'),
    body('billingAddress.city').notEmpty().withMessage('Billing city is required'),
    body('billingAddress.state').optional().isString(),
    body('billingAddress.country').optional().isString(),
    body('billingAddress.pinCode').optional().isString(),
    body('billingAddress.phoneNumber').optional().isString(),

    body('paymentMethod')
        .notEmpty().withMessage('Payment method is required')
        .isIn(['COD', 'UPI', 'Card', 'NetBanking']).withMessage('Invalid payment method'),
];

// Validation for update order status
const updateOrderStatusValidation = [
    param('orderId').isMongoId().withMessage('Invalid order ID'),
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])
        .withMessage('Invalid status value'),
    body('note').optional().isString(),
];

const paramOrderIdValidation = [
    param('orderId').notEmpty().withMessage('Order ID is required')
];

module.exports = {
    placeOrderValidation,
    updateOrderStatusValidation,
    paramOrderIdValidation
};