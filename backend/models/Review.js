const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.virtual('formattedDate').get(function() {
    return this.createdAt ? this.createdAt.toDateString() : '';
});


module.exports = mongoose.model("Review", reviewSchema);
