const { body, param } = require('express-validator');

const addCartValidation = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive number')
];

const paramProductIdValidation = [
    param('productId').notEmpty().withMessage('Product ID is required')
];

module.exports = {
    addCartValidation,
    paramProductIdValidation
};