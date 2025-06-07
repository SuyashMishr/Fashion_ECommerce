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

router.post(
  '/add',
  authenticate,
  authorizeRole('buyer'),
  addToWishlistValidation,
  validation,
  addToWishlist
);

router.delete(
  '/remove/:productId',
  authenticate,
  authorizeRole('buyer'),
  removeFromWishlistValidation,
  validation,
  removeFromWishlist
);

router.get(
  '/',
  authenticate,
  authorizeRole('buyer'),
  getWishlist
);

module.exports = router;
