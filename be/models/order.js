const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      default: Date.now,
      required: false,
    },
    primo: {
      type: String,
      required: false,
    },
    secondo: {
      type: String,
      required: false,
    },
    contorno: {
      type: String,
      required: false,
    },
    frutta: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, statics: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema, "order");
