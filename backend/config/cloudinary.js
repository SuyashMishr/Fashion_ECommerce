const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const logger = require('../utils/logger');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'fashion-ecommerce',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit', quality: 'auto' },
      { fetch_format: 'auto' }
    ],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || `${5 * 1024 * 1024}`), // 5MB fallback
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',');

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
    }
  },
});

/**
 * Deletes an image from Cloudinary using its public ID
 * @param {string} publicId
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info(`Image deleted from Cloudinary: ${publicId}`);
    return result;
  } catch (error) {
    logger.error(`Failed to delete image: ${error.message}`);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Uploads an image file to Cloudinary
 * @param {string} filePath
 * @param {object} options
 */
const uploadImage = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'fashion-ecommerce',
      ...options,
    });
    logger.info(`Image uploaded to Cloudinary: ${result.public_id}`);
    return result;
  } catch (error) {
    logger.error(`Failed to upload image: ${error.message}`);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Generates an optimized Cloudinary image URL
 * @param {string} publicId
 * @param {object} options
 */
const getOptimizedImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
    ...options,
  });
};

module.exports = {
  cloudinary,
  upload,
  deleteImage,
  uploadImage,
  getOptimizedImageUrl,
};
