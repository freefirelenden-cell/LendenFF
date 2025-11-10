import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },
    buyerId: {
      type: String, // Clerk user ID
      required: true
    },
    sellerId: {
      type: String, // Clerk user ID
      required: true
    },
    accountDetails: {
      title: { type: String, required: true },
      rank: { type: String, required: true },
      price: { type: Number, required: true },
      uid: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String }, // Encrypted
      images: [{ url: String, fileId: String }]
    },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    sellerInfo: {
      name: { type: String, required: true },
      phone: { type: String },
      email: { type: String }
    },
    paymentInfo: {
      paymentId: { type: String, required: true },
      transactionId: { type: String },
      method: { type: String, enum: ["jazzcash", "easypaisa", "bank_transfer"], required: true },
      amount: { type: Number, required: true },
      status: { 
        type: String, 
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
      },
      paymentProof: { type: String }, // Screenshot URL
      paymentDate: { type: Date }
    },
    orderStatus: {
      type: String,
      enum: [
        "pending_payment",
        "payment_received", 
        "account_transferred",
        "completed",
        "cancelled",
        "refunded"
      ],
      default: "pending_payment"
    },
    transferDetails: {
      transferredAt: { type: Date },
      transferMethod: { type: String }, // email, whatsapp, etc.
      notes: { type: String }
    },
    disputes: [{
      raisedBy: { type: String }, // buyer/seller
      reason: { type: String },
      description: { type: String },
      status: { type: String, enum: ["open", "resolved", "closed"] },
      createdAt: { type: Date, default: Date.now },
      resolvedAt: { type: Date }
    }],
    ratings: {
      buyerRating: { type: Number, min: 1, max: 5 },
      sellerRating: { type: Number, min: 1, max: 5 },
      buyerReview: { type: String },
      sellerReview: { type: String },
      ratedAt: { type: Date }
    }
  },
  { 
    timestamps: true 
  }
);

// Indexes for better performance
orderSchema.index({ orderId: 1 });
orderSchema.index({ buyerId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for total earnings
orderSchema.virtual('totalEarnings').get(function() {
  return this.paymentInfo.amount;
});

// Method to check if order is complete
orderSchema.methods.isComplete = function() {
  return this.orderStatus === 'completed';
};

// Method to check if payment is done
orderSchema.methods.isPaid = function() {
  return this.paymentInfo.status === 'completed';
};

export default mongoose.models.Order || mongoose.model("Order", orderSchema);