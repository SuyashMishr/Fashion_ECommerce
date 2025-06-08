const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createRazorpayOrder,
  verifyPaymentAndPlaceOrder
} = require('../controllers/paymentController');

router.post('/create-order', authenticate, authorizeRole('buyer'), createRazorpayOrder);
router.post('/verify-payment', authenticate, authorizeRole('buyer'), verifyPaymentAndPlaceOrder);

module.exports = router;