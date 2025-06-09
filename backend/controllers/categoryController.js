const Category = require("../models/Category");
const logger = require("../utils/logger");
const Product = require("../models/Product");


/**
 * Adds a new category.
 * Checks for duplicate category name before creating.
 * Supports optional parent category for nested categories.
 */
const addCategory = async (req, res, next) => {
    try {
        const { name, description, parentCategory } = req.body;

        // Check if category exists
        const exists = await Category.findOne({ name });
        if (exists) {
            return res
                .status(400)
                .json({ success: false, message: "Category already exists" });
        }

        const category = new Category({
            name,
            description,
            parentCategory: parentCategory || null,
        });
        await category.save();

        logger.info(`Category created: ${category._id}`);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        logger.error("Add category error:", error);
        next(error);
    }
};

/**
 * Updates an existing category by ID.
 * Allows partial updates for name, description, and parentCategory.
 */
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, parentCategory } = req.body;

        // Find category by ID
        const category = await Category.findById(id);
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }

        // Update fields if provided
        if (name) category.name = name;
        if (description) category.description = description;
        category.parentCategory = parentCategory || null;

        await category.save();

        logger.info(`Category updated: ${category._id}`);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        logger.error("Update category error:", error);
        next(error);
    }
};


/**
 * Deletes a category by ID.
 * Prevents deletion if the category is linked to any products.
 */
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if any products are associated with this category
        const productCount = await Product.countDocuments({ category: id });
        if (productCount > 0) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Cannot delete category linked to products",
                });
        }

        // Delete category by ID
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }

        logger.info(`Category deleted: ${category._id}`);
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        logger.error("Delete category error:", error);
        next(error);
    }
};

/**
 * Fetches all categories.
 * Uses lean() for better performance by returning plain JS objects instead of Mongoose documents.
 */

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().lean();
        res
            .status(200)
            .json({ success: true, count: categories.length, data: categories });
    } catch (error) {
        logger.error("Get categories error:", error);
        next(error);
    }
};

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
};
