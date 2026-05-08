// backend/src/orders/order.model.js

const mongoose = require("mongoose");

// Embedded product snapshot schema
const productSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productImage: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    // Embedded product instead of reference
    product: {
      type: productSchema,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DECLINED", "CANCELLED"],
      default: "PENDING",
      index: true,
    },

    items: {
      type: [orderItemSchema],
      validate: [
        (arr) => arr.length > 0,
        "At least one order item is required",
      ],
      required: true,
    },

    // Pricing
    subtotal: {
      type: Number,
      min: 0,
      default: 0,
    },

    taxAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    shippingAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    discountAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMode: {
      type: String,
      enum: ["Cash", "Credit Card", "UPI", "QR"],
      default: "Cash",
    },

    deliveryPartner: {
      type: String,
      default: null,
    },

    etaMinutes: {
      type: Number,
      min: 0,
      default: null,
    },

    orderDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

// Frontend compatibility
orderSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();

    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Order", orderSchema);