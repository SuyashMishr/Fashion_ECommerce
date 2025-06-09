const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const emailService = require('../services/emailService');


// Utility: Format user data for API response
const formatUserResponse = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    ...(user.role === 'seller' && {
      businessInfo: user.businessInfo,
      sellerStatus: user.sellerStatus,
    }),
    createdAt: user.createdAt,
  };
};

// Helper: Generate and return token cookies + response
const setAuthCookiesAndRespond = async (user, res, statusCode = 200, message = 'Success') => {
  const token = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshTokens.push({ token: refreshToken, createdAt: new Date() });
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
  };

  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      success: true,
      message,
      data: {
        token,
        refreshToken,
        user: formatUserResponse(user)
      }
    });
};

// Helper: Clear auth cookies
const clearAuthCookies = (res) => {
  const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 10 * 1000) // expires in 10s
  };

  res.cookie('token', 'none', cookieConfig);
  res.cookie('refreshToken', 'none', cookieConfig);
};



// Register new user
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, businessInfo } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Prepare user data
    const userData = { name, email, password, phone, role: role || 'buyer' };
    if (role === 'seller' && businessInfo) {
      userData.businessInfo = businessInfo;
      userData.sellerStatus = 'pending';
    }

    // Create user and send verification email
    const user = await User.create(userData);
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    try {
      await emailService.sendVerificationEmail(user.email, verificationToken, user.name);
    } catch (err) {
      logger.error('Verification email failed:', err);
    }

    logger.info(`New user registered: ${user.email} (${user.role})`);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.'
    });

  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};


// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user and verify password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'Account is deactivated. Please contact support.' });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ success: false, message: 'Please verify your email first' });
    }

    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);
    return setAuthCookiesAndRespond(user, res, 200, 'Login successful');

  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};


// Logout user
const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'No refresh token found in cookies' });
    }

    // Validate refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.refreshTokens = user.refreshTokens.filter(t => t.token !== refreshToken);
      await user.save();
      logger.info(`User logged out: ${user.email}`);
    }

    clearAuthCookies(res);
    return res.status(200).json({ success: true, message: 'Logged out successfully' });

  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};



// Get current logged in user
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        user: formatUserResponse(user),
      },
    });

  } catch (error) {
    logger.error('GetMe error:', error);
    next(error);
  }
};

// Verify email
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is missing' });
    }

    try {
      // Verify JWT token, get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by id, with matching token and unexpired verification token
      const user = await User.findOne({
        _id: decoded.id,
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired verification token',
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          message: 'Email is already verified',
        });
      }

      // Mark email as verified and activate user
      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      user.isActive = true;
      await user.save();

      logger.info(`Email verified for user: ${user.email}`);

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully. You can now login.',
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token',
      });
    }
  } catch (error) {
    logger.error('Email verification error:', error);
    next(error);
  }
};


// Send password reset email to user
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user found with this email' });
    }

    // Generate reset token and save
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(user.email, resetToken, user.name);
      logger.info(`Password reset email sent to ${user.email}`);
      return res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (emailErr) {
      logger.error('Password reset email failed:', emailErr);
      return res.status(500).json({ success: false, message: 'Failed to send password reset email' });
    }

  } catch (error) {
    logger.error('Forgot password error:', error);
    next(error);
  }
};


// Reset password
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid reset token'
        });
      }

      // Set new password
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      logger.info(`Password reset for user: ${user.email}`);

      // Send success response, but NO token
      res.status(200).json({
        success: true,
        message: 'Password reset successful. Please login with your new password.'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
  } catch (error) {
    logger.error('Reset password error:', error);
    next(error);
  }
};


// Refresh access token using refresh token from cookie
const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Refresh token missing' });
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Check if refresh token is in user tokens list (valid)
    const tokenExists = user.refreshTokens.some(t => t.token === token);
    if (!tokenExists) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    // Generate new tokens and respond
    return setAuthCookiesAndRespond(user, res, 200, 'Token refreshed successfully');

  } catch (error) {
    logger.error('Refresh token error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};


module.exports = {
  register,
  login,
  logout,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken
};
