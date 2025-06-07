const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validateRequest');
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} = require('../controllers/categoryController');

const {
  addCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
} = require('../validations/categoryValidation');


// Add new category (only admin or seller)
router.post(
  '/',
  authenticate,
  authorizeRole('admin'),   // or 'seller' if sellers can add categories
  addCategoryValidation,
  validation,
  addCategory
);

// Update category by ID
router.put(
  '/:id',
  authenticate,
  authorizeRole('admin'),
  updateCategoryValidation,
  validation,
  updateCategory
);

// Delete category by ID
router.delete(
  '/:id',
  authenticate,
  authorizeRole('admin'),
  deleteCategoryValidation,
  validation,
  deleteCategory
);

// Get all categories (public)
router.get('/', getAllCategories);

module.exports = router;
