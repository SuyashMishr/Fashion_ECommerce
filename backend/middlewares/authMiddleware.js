const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Middleware to authenticate user
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookie
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid. User not found.'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated.'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      logger.error('Authentication error:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired.'
        });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token.'
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// Middleware to authorize user roles
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please authenticate first.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }

    next();
  };
};

// Middleware to check if user is seller and approved
const requireApprovedSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please authenticate first.'
    });
  }

  if (req.user.role !== 'seller') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Seller account required.'
    });
  }

  if (req.user.sellerStatus !== 'approved') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Seller account must be approved.'
    });
  }

  next();
};

// Middleware to check if user owns the resource
const checkOwnership = (resourceModel, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const resource = await resourceModel.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found.'
        });
      }

      // Check if user owns the resource
      const ownerId = resource.user || resource.seller || resource.buyer || resource.owner;
      
      if (!ownerId || ownerId.toString() !== req.user._id.toString()) {
        // Allow admin to access any resource
        if (req.user.role !== 'admin') {
          return res.status(403).json({
            success: false,
            message: 'Access denied. You can only access your own resources.'
          });
        }
      }

      req.resource = resource;
      next();
    } catch (error) {
      logger.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during ownership verification.'
      });
    }
  };
};


module.exports = {
  authenticate,
  authorizeRole,
  requireApprovedSeller,
  checkOwnership,
};
