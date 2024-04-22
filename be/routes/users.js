const express = require("express");
const router = express.Router();
const UserModel = require("../models/users");
const bcrypt = require("bcrypt");

router.get("/users", async (req, res) => {
  // const { page = 1, pageSize = 2 } = req.query;

  try {
    const users = await UserModel.find();
    // .limit(pageSize)
    // .skip((page - 1) * pageSize);

    // const totalUsers = await UserModel.countDocuments();

    res.status(200).send({
      // currentPage: +page,
      // tatalPages: Math.ceil(totalUsers / pageSize),
      users,
    });
  } catch (e) {
    res.status(500).send({
      MessageEvent: "internal server error",
    });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).send("User no find");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    res.status(404).send("User no find");
  }
  try {
    const updateData = req.body;
    const options = { new: true };
    const result = await UserModel.findByIdAndUpdate(id, updateData, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

router.post("/addUsers", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new UserModel({
    nome: req.body.nome,
    email: req.body.email,
    password: hashedPassword,
    orders: [],
  });

  try {
    const userToSave = await newUser.save();
    res.status(201).send({
      payload: userToSave,
    });
  } catch (error) {
    res.status(500).send({
      MessageEvent: "internal server error",
    });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(404).send("User no find");
    }
    res.status(200).send(`${id} removed`);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

module.exports = router;
