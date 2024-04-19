const mongoose = require("mongoose");

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
    // data: {
    //   type: Date.now,
    //   required: true,
    // },
    // primo: {
    //   type: String,
    //   required: true,
    // },
    // secondo: {
    //   type: String,
    //   required: true,
    // },
    // contorno: {
    //   type: String,
    //   required: true,
    // },
    // frutta: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true, statics: true }
);

module.exports = mongoose.model("UserModel", UserSchema, "users");
