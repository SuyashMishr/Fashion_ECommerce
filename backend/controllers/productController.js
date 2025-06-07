const Product = require('../models/Product');
const Category = require('../models/Category');
const logger = require('../utils/logger');
const { deleteImage, getOptimizedImageUrl } = require('../config/cloudinary');

// Helper to format images with optimized URLs
const formatImages = (images) =>
    images.map(img => ({
        url: getOptimizedImageUrl(img.public_id),
        public_id: img.public_id,
    }));

// Add product
const addProduct = async (req, res, next) => {
    try {
        const { title, description, price, sizes, stock, category } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one product image is required.' });
        }

        // Validate category
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ success: false, message: 'Invalid category' });
        }

        // Map images from uploaded files (already uploaded via multer + CloudinaryStorage)
        const images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename,
        }));

        const product = new Product({
            seller: req.user._id,
            title,
            description,
            price,
            sizes: sizes ? (Array.isArray(sizes) ? sizes : [sizes]) : [],
            images,
            stock,
            category,
        });

        await product.save();

        logger.info(`Product created: ${product._id} by user ${req.user._id}`);

        // Return product with optimized image URLs
        res.status(201).json({ success: true, data: { ...product.toObject(), images: formatImages(product.images) } });
    } catch (error) {
        logger.error('Add product error:', error);
        next(error);
    }
};

// Get product by ID with populated relations
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate('category')
            .populate('seller', 'name email')
            .lean();

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Format images with optimized URLs
        product.images = formatImages(product.images);

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        logger.error('Get product by ID error:', error);
        next(error);
    }
};

// Browse products with filters, pagination, and search
const browseProducts = async (req, res, next) => {
    try {
        let { page = 1, limit = 10, size, minPrice, maxPrice, category, search } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const filter = {};

        if (size) {
            const sizes = Array.isArray(size) ? size : size.split(',');
            filter.sizes = { $in: sizes };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .populate('category')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Format images in all products
        products.forEach(product => {
            product.images = formatImages(product.images);
        });

        res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            total,
            count: products.length,
            data: products,
        });
    } catch (error) {
        logger.error('Browse products error:', error);
        next(error);
    }
};

// Update product
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, price, sizes, stock, category } = req.body;

        const product = await Product.findOne({ _id: id, seller: req.user._id });
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found or unauthorized' });
        }

        if (category) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ success: false, message: 'Invalid category' });
            }
            product.category = category;
        }

        // If new images uploaded, delete old images from Cloudinary and replace
        if (req.files && req.files.length > 0) {
            for (const img of product.images) {
                await deleteImage(img.public_id);
            }

            product.images = req.files.map(file => ({
                url: file.path,
                public_id: file.filename,
            }));
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.sizes = sizes ? (Array.isArray(sizes) ? sizes : [sizes]) : product.sizes;
        product.stock = stock !== undefined ? stock : product.stock;
        product.updatedAt = Date.now();

        await product.save();

        logger.info(`Product updated: ${product._id} by user ${req.user._id}`);

        res.status(200).json({ success: true, data: { ...product.toObject(), images: formatImages(product.images) } });
    } catch (error) {
        logger.error('Update product error:', error);
        next(error);
    }
};

// Delete product
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the product by ID and check if the seller matches the logged-in user
        const product = await Product.findOne({ _id: id, seller: req.user._id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or unauthorized',
            });
        }

        // Delete associated images from Cloudinary
        if (Array.isArray(product.images)) {
            for (const img of product.images) {
                if (img.public_id) {
                    await deleteImage(img.public_id);
                }
            }
        }

        await Product.deleteOne({ _id: id });

        logger.info(`Product deleted: ${id} by user ${req.user._id}`);

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        logger.error(`Delete product error for ID ${req.params.id}:`, error);
        return res.status(500).json({
            success: false,
            message: 'Server error while deleting product',
        });
    }
};


// Get all products of seller
const getSellerProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 }).lean();

        products.forEach(product => {
            product.images = formatImages(product.images);
        });

        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        logger.error('Get seller products error:', error);
        next(error);
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getSellerProducts,
    getProductById,
    browseProducts,
};
