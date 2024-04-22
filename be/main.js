const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = 7777;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "DB connection error"));
db.once("open", () => {
  console.log("Database successfully connected !");
});

const app = express();

app.use(express.json());
// app.use(bodyParser.json());

app.use(cors());

const userRoute = require("./routes/users.js");
const loginRoute = require("./routes/login.js");
const foodRoute = require("./routes/food.js");
const orderRoute = require("./routes/order.js");

app.use("/", userRoute);
app.use("/", loginRoute);
app.use("/", foodRoute);
app.use("/", orderRoute);

app.listen(PORT, () =>
  console.log(`Server connected and listening on PORT ${PORT}`)
);
