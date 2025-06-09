const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateRequest');
const {
  addToCart,
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

const {
  addCartValidation,
  paramProductIdValidation
} = require('../validations/cartValidation');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints (buyer only)
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add product to cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product ID and quantity to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "60a7c0f8a7c7e5f5f0d0e0b3"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/add', authenticate, authorizeRole('buyer'), addCartValidation, validate, addToCart);

/**
 * @swagger
 * /cart/increase/{productId}:
 *   patch:
 *     summary: Increase quantity of product in cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to increase quantity for
 *     responses:
 *       200:
 *         description: Product quantity increased successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 */
router.patch('/increase/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, increaseQty);

/**
 * @swagger
 * /cart/decrease/{productId}:
 *   patch:
 *     summary: Decrease quantity of product in cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to decrease quantity for
 *     responses:
 *       200:
 *         description: Product quantity decreased successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 */
router.patch('/decrease/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, decreaseQty);

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove product from cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 */
router.delete('/remove/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, removeFromCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear entire cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/clear', authenticate, authorizeRole('buyer'), clearCart);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all items in cart (buyer only)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items in cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   productDetails:
 *                     type: object
 *                     description: Product info
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, authorizeRole('buyer'), getCart);

module.exports = router;
