const { body, param } = require('express-validator');

const addCategoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 50 }).withMessage('Category name must be at most 50 characters'),
];

const updateCategoryValidation = [
  param('id')
    .isMongoId().withMessage('Invalid category ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category name must be at most 50 characters'),
];

const deleteCategoryValidation = [
  param('id')
    .isMongoId().withMessage('Invalid category ID'),
];

module.exports = {
  addCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
};
