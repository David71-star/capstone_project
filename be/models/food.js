const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, statics: true }
);

module.exports = mongoose.model("FoodModel", FoodSchema, "Food");
