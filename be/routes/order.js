const OrderModel = require("../models/order");
const UserModel = require("../models/users");

const express = require("express");
const order = express.Router();

order.get("/myOrders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const myOrders = await UserModel.findById(id);
    console.log(myOrders);
    res.status(200).send({
      myOrders,
    });
  } catch (e) {
    res.status(500).send({
      MessageEvent: "internal server error",
    });
  }
});

order.post("/addOrder/:id", async (req, res) => {
  try {
    // Trova l'utente per l'ID fornito nei parametri della richiesta
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    // Creazione di un nuovo ordine
    const newOrder = new OrderModel({
      userId: req.body.userId,
      dataOrder: req.body.dataOrder,
      primo: req.body.primo,
      secondo: req.body.secondo,
      contorno: req.body.contorno,
      frutta: req.body.frutta,
    });

    const savedOrder = await newOrder.save();
    console.log("Ordine salvato:", savedOrder);

    user.orders.push(savedOrder);
    await user.save();

    if (newOrder) {
      res.status(201).json({ savedOrder });
    }
  } catch (error) {
    console.error("Errore durante l'aggiunta dell'ordine:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

order.delete("/removeOrder/:userId/:id", async (req, res) => {
  const { userId, id } = req.params;
  try {
    // Trova l'utente per ID
    const user = await UserModel.findById(userId);

    // Trova l'indice dell'ordine nell'array degli ordini dell'utente
    const index = user.orders.findIndex((order) => order._id.toString() === id);

    if (index > -1) {
      // Rimuovi l'ordine dall'array
      user.orders.splice(index, 1);

      // Salva l'utente per sincronizzare i cambiamenti nel database
      await user.save();
      console.log("Ordine rimosso dall'array dell'utente.");
    }

    // Elimina l'ordine dal database utilizzando l'ID
    const orderRemove = await OrderModel.findByIdAndDelete(id);

    if (!orderRemove) {
      res.status(404).send("Order not found");
      return;
    }

    res.status(200).send(`${id} removed`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error");
  }
});

module.exports = order;
