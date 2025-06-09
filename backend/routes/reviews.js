const express = require("express");
const router = express.Router();
const { authenticate, authorizeRole } = require("../middlewares/authMiddleware");
const {
  addOrUpdateReview,
  deleteReview,
  getReviewsForProduct,
} = require("../controllers/reviewController");

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add or update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: "60f7c2e7c25e4b3d2c9d5476"
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Great product!"
 *     responses:
 *       200:
 *         description: Review added or updated
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, authorizeRole('buyer'), addOrUpdateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 */
router.delete("/:id", authenticate, authorizeRole('buyer'), deleteReview);

/**
 * @swagger
 * /reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/product/:productId", getReviewsForProduct);

module.exports = router;
