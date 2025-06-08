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
  trackOrder } = require('../controllers/orderController');

const {
  placeOrderValidation,
  updateOrderStatusValidation,
  paramOrderIdValidation
} = require('../validations/orderValidation');


// Place order (buyer only)
router.post(
  '/',
  authenticate,
  authorizeRole('buyer'),
  placeOrderValidation,
  validate,
  placeOrder
);

// Get orders of logged-in buyer
router.get(
  '/my-orders',
  authenticate,
  authorizeRole('buyer'),
  getUserOrders
);

// Get orders for logged-in seller
router.get(
  '/seller-orders',
  authenticate,
  authorizeRole('seller'),
  getSellerOrders
);

// Update order status (seller only)
router.patch(
  '/:orderId/status',
  authenticate,
  authorizeRole('seller'),
  paramOrderIdValidation,
  updateOrderStatusValidation,
  validate,
  updateOrderStatus
);

router.get(
  '/track/:orderId',
  authenticate,
  authorizeRole('buyer', 'seller'),
  paramOrderIdValidation,
  validate,
  trackOrder
);


module.exports = router;
