import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // -------------------------------
    // Buyer Info
    // -------------------------------
    buyerId: { type: String, required: true },
    buyerName: String,
    buyerEmail: String,
    buyerPhone: String,

    // -------------------------------
    // Seller Info
    // -------------------------------
    sellerId: { type: String, required: true },
    sellerName: String,
    sellerPhone: String,
    sellerEmail: String,

    // -------------------------------
    // Account Info
    // -------------------------------
    accountId: { type: String, required: true },

    // Basic visible fields (optional but useful)
    accountTitle: String,
    accountPrice: Number,

    // 🔥 SNAPSHOT = full copy of account (future use)
    accountDetailsSnapshot: {
      type: Object,
      required: false,
      default: null,
    },

    // -------------------------------
    // Payment Info
    // -------------------------------
    paymentMethod: {
      type: String,
      enum: ["easypaisa", "jazzcash", "bank", "other"],
      default: "easypaisa",
    },

    transactionId: String,
    paidAmount: Number,

    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed"],
    },

    // Screenshot URL
    paymentScreenshot: String,

    // -------------------------------
    // Order Status
    // -------------------------------
    orderStatus: {
      type: String,
      default: "processing",
      enum: ["processing", "delivering", "completed", "cancelled"],
    },

    // Admin Section
    adminNotes: String,

    // Future switch (snapshot ON/OFF)
    snapshotEnabled: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
