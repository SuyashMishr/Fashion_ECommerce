const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/authMiddleware');
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


// Routes
router.post('/add', authenticate, authorizeRole('buyer'), addCartValidation, validate, addToCart);
router.patch('/increase/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, increaseQty);
router.patch('/decrease/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, decreaseQty);
router.delete('/remove/:productId', authenticate, authorizeRole('buyer'), paramProductIdValidation, validate, removeFromCart);
router.delete('/clear', authenticate, authorizeRole('buyer'), clearCart);
router.get('/', authenticate, authorizeRole('buyer'), getCart);

module.exports = router;
