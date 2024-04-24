const OrderModel = require("../models/order");
const UserModel = require("../models/users");

const express = require("express");
const router = express.Router();

router.post("/addOrder/:id", async (req, res) => {
  try {
    // Trova l'utente per l'ID fornito nei parametri della richiesta
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    // Creazione di un nuovo ordine
    const newOrder = new OrderModel({
      userId: req.body.userId,
      primo: req.body.primo,
      secondo: req.body.secondo,
      contorno: req.body.contorno,
      frutta: req.body.frutta,
    });

    const savedOrder = await newOrder.save();
    console.log("Ordine salvato:", savedOrder);

    if (newOrder) {
      res.status(201).json({ savedOrder });
    }
  } catch (error) {
    console.error("Errore durante l'aggiunta dell'ordine:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

module.exports = router;
