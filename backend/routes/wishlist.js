const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validateRequest'); 
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require('../controllers/wishlistController');

const {
  addToWishlistValidation,
  removeFromWishlistValidation,
} = require('../validations/wishlistValidation');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist operations for buyers
 */

/**
 * @swagger
 * /wishlist/add:
 *   post:
 *     summary: Add a product to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Invalid input or product already in wishlist
 */
router.post(
  '/add',
  authenticate,
  authorizeRole('buyer'),
  addToWishlistValidation,
  validation,
  addToWishlist
);

/**
 * @swagger
 * /wishlist/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the wishlist
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist
 *       404:
 *         description: Product not found in wishlist
 */
router.delete(
  '/remove/:productId',
  authenticate,
  authorizeRole('buyer'),
  removeFromWishlistValidation,
  validation,
  removeFromWishlist
);

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get wishlist of the logged-in buyer
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 */
router.get(
  '/',
  authenticate,
  authorizeRole('buyer'),
  getWishlist
);

module.exports = router;
