const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateRequest');
const { 
  placeOrder,
  getUserOrders,
  getSellerOrders,
  updateOrderStatus,
  trackOrder 
} = require('../controllers/orderController');

const {
  updateOrderStatusValidation,
  paramOrderIdValidation
} = require('../validations/orderValidation');

// Routes
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints for placing and managing orders
 */

/**
 * @swagger
 * /orders/place-order:
 *   post:
 *     summary: Place a new order (buyer only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderedItems
 *               - userAddress
 *               - amount
 *             properties:
 *               orderedItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               userAddress:
 *                 type: string
 *               amount:
 *                 type: number
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/place-order',
  authenticate,
  authorizeRole('buyer'),
  placeOrder
);

/**
 * @swagger
 * /orders/my-orders:
 *   get:
 *     summary: Get orders of logged-in buyer
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buyer's orders
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/my-orders',
  authenticate,
  authorizeRole('buyer'),
  getUserOrders
);

/**
 * @swagger
 * /orders/seller-orders:
 *   get:
 *     summary: Get orders for the logged-in seller
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of seller's orders
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/seller-orders',
  authenticate,
  authorizeRole('seller'),
  getSellerOrders
);

/**
 * @swagger
 * /orders/{orderId}/status:
 *   patch:
 *     summary: Update order status (seller only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       description: New status of the order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.patch(
  '/:orderId/status',
  authenticate,
  authorizeRole('seller'),
  paramOrderIdValidation,
  updateOrderStatusValidation,
  validate,
  updateOrderStatus
);

/**
 * @swagger
 * /orders/track/{orderId}:
 *   get:
 *     summary: Track order status (buyer or seller)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order status information
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.get(
  '/track/:orderId',
  authenticate,
  authorizeRole('buyer', 'seller'),
  paramOrderIdValidation,
  validate,
  trackOrder
);

module.exports = router;
