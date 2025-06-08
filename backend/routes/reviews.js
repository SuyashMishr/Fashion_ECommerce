// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  addOrUpdateReview,
  deleteReview,
  getReviewsForProduct,
} = require("../controllers/reviewController");
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");

router.post("/", authenticate, authorizeRole('buyer'), addOrUpdateReview);
router.delete("/:id", authenticate, authorizeRole('buyer'), deleteReview);
router.get("/product/:productId", authenticate, authorizeRole('buyer'), getReviewsForProduct);

module.exports = router;
