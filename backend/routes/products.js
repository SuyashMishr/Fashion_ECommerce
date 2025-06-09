const express = require("express");
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validateRequest');
const { upload } = require('../config/cloudinary');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getProductById,
  browseProducts,
} = require("../controllers/productController");

const {
  addProductValidation,
  updateProductValidation,
  deleteProductValidation,
  browseProductsValidation,
} = require('../validations/productValidation');

const router = express.Router();

// Seller routes
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management for sellers and buyers
 */

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product (seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/add",
  authenticate,
  authorizeRole("seller"),
  upload.array("images", 5),
  addProductValidation,
  validation,
  addProduct
);

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     summary: Update a product by ID (seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put(
  "/update/:id",
  authenticate,
  authorizeRole("seller"),
  upload.array("images", 5),
  updateProductValidation,
  validation,
  updateProduct
);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Delete a product by ID (seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete(
  "/delete/:id",
  authenticate,
  authorizeRole("seller"),
  deleteProductValidation,
  validation,
  deleteProduct
);

/**
 * @swagger
 * /products/my-products:
 *   get:
 *     summary: Get all products of the logged-in seller
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get(
  "/my-products",
  authenticate,
  authorizeRole("seller"),
  getSellerProducts
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Browse products with optional filters (buyer or seller)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products
 */
router.get(
  "/",
  authenticate,
  authorizeRole("buyer", "seller"),
  browseProductsValidation,
  validation,
  browseProducts
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product detail
 *       404:
 *         description: Product not found
 */
router.get(
  "/:id",
  authenticate,
  authorizeRole("buyer", "seller"),
  getProductById
);

module.exports = router;