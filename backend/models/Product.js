const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [
    {
      type: String,
      enum: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "28",
        "30",
        "32",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
      ],
    },
  ],
  images: [{ url: String, public_id: String }],
  stock: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
