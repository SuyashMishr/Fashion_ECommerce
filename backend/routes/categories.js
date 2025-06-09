const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
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

// Routes 
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management endpoints
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add new category (admin or seller)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Category data to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Men's Fashion"
 *               description:
 *                 type: string
 *                 example: "Clothing and accessories for men"
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  authenticate,
  authorizeRole('admin', 'seller'),
  addCategoryValidation,
  validation,
  addCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category by ID (admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       description: Updated category data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Women's Fashion"
 *               description:
 *                 type: string
 *                 example: "Clothing and accessories for women"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.put(
  '/:id',
  authenticate,
  authorizeRole('admin'),
  updateCategoryValidation,
  validation,
  updateCategory
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by ID (admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.delete(
  '/:id',
  authenticate,
  authorizeRole('admin'),
  deleteCategoryValidation,
  validation,
  deleteCategory
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories (public access)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', getAllCategories);

module.exports = router;
