const mongoose = require("mongoose");
const OrderModel = require("./order");

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    data: {
      type: Date,
      default: Date.now,
      required: false,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderModel" }],
  },
  { timestamps: true, statics: true }
);

module.exports = mongoose.model("UserModel", UserSchema, "users");
