const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                addedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    { timestamps: true }
);

// Add product with feedback
wishlistSchema.methods.addProduct = async function (productId) {
    const isAlreadyAdded = this.products.some((p) => p.product.toString() === productId.toString());
    if (isAlreadyAdded) {
        return { added: false, message: 'Product already in wishlist' };
    }

    this.products.push({ product: productId });
    await this.save();
    return { added: true };
};

// Remove product with feedback
wishlistSchema.methods.removeProduct = async function (productId) {
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.product.toString() !== productId.toString());

    if (this.products.length === initialLength) {
        return { removed: false, message: 'Product not found in wishlist' };
    }

    await this.save();
    return { removed: true };
};


module.exports = mongoose.model("Wishlist", wishlistSchema);
