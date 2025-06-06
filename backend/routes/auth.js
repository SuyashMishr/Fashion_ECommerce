const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken
} = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validateRequest');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('First name must be between 3 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('role')
    .optional()
    .isIn(['buyer', 'seller'])
    .withMessage('Role must be either buyer or seller'),
  body('businessInfo.businessName')
    .if(body('role').equals('seller'))
    .notEmpty()
    .withMessage('Business name is required for sellers'),
  body('businessInfo.businessType')
    .if(body('role').equals('seller'))
    .notEmpty()
    .withMessage('Business type is required for sellers')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Routes
router.post('/register', registerValidation, validation, register);
router.post('/login', loginValidation, validation, login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);
router.post('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPasswordValidation, validation, forgotPassword);
router.put('/reset-password/:token', resetPasswordValidation, validation, resetPassword);
router.post('/refresh-token', refreshToken);

module.exports = router;
