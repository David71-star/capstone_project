const express = require("express");
const food = express.Router();
const FoodModel = require("../models/food");

food.get("/food", async (req, res) => {
  // const { page = 1, pageSize = 2 } = req.query;

  try {
    const myfood = await FoodModel.find();
    // .limit(pageSize)
    // .skip((page - 1) * pageSize);

    // const totalFood = await FoodModel.countDocuments();

    res.status(200).send({
      statuscode: 200,
      // currentPage: +page,
      // tatalPages: Math.ceil(totalFood / pageSize),
      myfood,
    });
  } catch (e) {
    res.status(500).send({
      MessageEvent: "internal server error",
    });
  }
});

food.post("/addFood", async (req, res) => {
  const newFood = new FoodModel({
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
    tipo: req.body.tipo,
  });

  try {
    const foodToSave = await newFood.save();
    res.status(201).send({
      payload: foodToSave,
    });
  } catch (error) {
    res.status(500).send({
      MessageEvent: "internal server error",
    });
  }
});

food.patch("/changeFood/:id", async (req, res) => {
  const { id } = req.params;
  const changeFood = await FoodModel.findById(id);
  if (!changeFood) {
    res.status(404).send("Food no find");
  }
  try {
    const updateData = req.body;
    const options = { new: true };
    const result = await FoodModel.findByIdAndUpdate(id, updateData, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

food.delete("/removeFood/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foodRemove = await FoodModel.findByIdAndDelete(id);
    if (!foodRemove) {
      res.status(404).send("User no find");
    }
    res.status(200).send(`${id} removed`);
  } catch (error) {
    res.status(500).send("Internal server Error");
  }
});

module.exports = food;
