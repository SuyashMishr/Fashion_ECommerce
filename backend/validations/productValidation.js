const { body, param, query } = require('express-validator');

const addProductValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title must be at most 100 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('sizes')
    .optional()
    .custom(value => {
      if (!Array.isArray(value)) {
        throw new Error('Sizes must be an array');
      }
      return true;
    }),

  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Category must be a valid MongoDB ID'),
];

const updateProductValidation = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),

  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Title must be at most 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters'),

  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('sizes')
    .optional()
    .custom(value => {
      if (!Array.isArray(value)) {
        throw new Error('Sizes must be an array');
      }
      return true;
    }),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('category')
    .optional()
    .isMongoId().withMessage('Category must be a valid MongoDB ID'),
];

const deleteProductValidation = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
];

const browseProductsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Limit must be a positive integer'),

  query('size')
    .optional()
    .custom(value => {
      // Accept comma-separated string or array
      if (typeof value === 'string') return true;
      if (Array.isArray(value)) return true;
      throw new Error('Size must be a string or an array');
    }),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('minPrice must be a positive number'),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('maxPrice must be a positive number'),

  query('category')
    .optional()
    .isMongoId().withMessage('Category must be a valid MongoDB ID'),

  query('search')
    .optional()
    .isString().withMessage('Search must be a string'),
];

module.exports = {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation,
  browseProductsValidation,
};
