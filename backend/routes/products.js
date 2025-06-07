const express = require("express");
const { authenticate } = require('../middlewares/authMiddleware');
const validation = require('../middlewares/validateRequest');
const { authorizeRole } = require('../middlewares/authMiddleware');
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
router.post(
  "/add",
  authenticate,
  authorizeRole('seller'),
  upload.array("images", 5),
  addProductValidation,
  validation,
  addProduct
);
router.put(
  "/update/:id",
  authenticate,
  authorizeRole('seller'),
  upload.array("images", 5),
  updateProductValidation,
  validation,
  updateProduct
);
router.delete(
  "/delete/:id",
  authenticate,
  authorizeRole('seller'),
  deleteProductValidation,
  validation,
  deleteProduct
);
router.get(
  "/my-products",
  authenticate,
  authorizeRole('seller'),
  getSellerProducts
);

// Buyer routes
router.get("/", browseProductsValidation, validation,  browseProducts);
router.get("/:id", getProductById);

module.exports = router;
