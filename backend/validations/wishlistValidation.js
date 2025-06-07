const { body, param } = require('express-validator');

const addToWishlistValidation = [
  body('productId')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid Product ID format'),
];

const removeFromWishlistValidation = [
  param('productId')
    .notEmpty().withMessage('Product ID parameter is required')
    .isMongoId().withMessage('Invalid Product ID format'),
];

module.exports = {
  addToWishlistValidation,
  removeFromWishlistValidation,
};
