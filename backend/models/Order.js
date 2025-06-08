const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {                  // Added price snapshot field
    type: Number,
    required: true,
  },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  pinCode: String,
  phoneNumber: String,
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['COD', 'UPI', 'Card', 'NetBanking'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  transactionId: String,
  paidAt: Date,
}, { _id: false });

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now,
  },
  note: String,
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { _id: false });

const pricingSchema = new mongoose.Schema({
  subtotal: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
}, { _id: false });

const shippingSchema = new mongoose.Schema({
  shippedAt: Date,
  deliveredAt: Date,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  orderNumber: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
  },
  statusHistory: [statusHistorySchema],
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  pricing: pricingSchema,
  payment: paymentSchema,
  placedAt: {
    type: Date,
    default: Date.now,
  },
  shipping: shippingSchema,
  cancelledAt: Date,
  returnedAt: Date,
}, { timestamps: true });

// // Indexes
// orderSchema.index({ buyer: 1, createdAt: -1 });
// orderSchema.index({ orderNumber: 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ 'items.seller': 1, createdAt: -1 });
// orderSchema.index({ 'payment.status': 1 });

// Virtual: total number of items
orderSchema.virtual('totalItems').get(function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
});


// Pre-save middleware to generate order number & update status history
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
    
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
      note: 'Order created',
    });
  }

  next();
});

// Method to update status
orderSchema.methods.updateStatus = function(newStatus, note, updatedBy) {
  this.status = newStatus;
  this.statusHistory.push({ status: newStatus, changedAt: new Date(), note, updatedBy });

    if (!this.shipping) {
    this.shipping = {}; // 🛠️ Ensure it's initialized
  }

  switch (newStatus) {
    case 'shipped':
      this.shipping.shippedAt = new Date();
      break;
    case 'delivered':
      this.shipping.deliveredAt = new Date();
      break;
    case 'cancelled':
      this.cancelledAt = new Date();
      break;
    case 'returned':
      this.returnedAt = new Date();
      break;
  }
};

// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.pricing.subtotal = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  this.pricing.total = this.pricing.subtotal + this.pricing.tax + this.pricing.shipping - this.pricing.discount;
};

module.exports = mongoose.model('Order', orderSchema);
