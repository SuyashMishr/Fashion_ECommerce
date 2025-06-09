const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createRazorpayOrder,
  verifyPaymentAndPlaceOrder
} = require('../controllers/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing and order placement (Razorpay)
 */

/**
 * @swagger
 * /payments/create-order:
 *   post:
 *     summary: Create a new Razorpay order (buyer only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order creation input
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 499
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/create-order', authenticate, authorizeRole('buyer'), createRazorpayOrder);

/**
 * @swagger
 * /payments/verify-payment:
 *   post:
 *     summary: Verify payment and place order (buyer only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment verification payload
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *               - orderedItems
 *               - userAddress
 *               - amount
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *               orderedItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
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
 *         description: Payment verified and order placed
 *       400:
 *         description: Payment verification failed
 *       500:
 *         description: Internal server error
 */
router.post('/verify-payment', authenticate, authorizeRole('buyer'), verifyPaymentAndPlaceOrder);

module.exports = router;
