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
      primo: req.body.primo,
      secondo: req.body.secondo,
      contorno: req.body.contorno,
      frutta: req.body.frutta,
    });

    const savedOrder = await newOrder.save();

    if (newOrder.primo) {
      console.log(newOrder);
      res.status(201).json({ primo: savedOrder.primo });
    } else if (newOrder.secondo) {
      res.status(201).json({
        secondo: savedOrder.secondo,
      });
    } else if (newOrder.contorno) {
      res.status(201).json({
        contorno: savedOrder.contorno,
      });
    } else if (newOrder.frutta) {
      res.status(201).json({ frutta: savedOrder.frutta });
    }
  } catch (error) {
    console.error("Errore durante l'aggiunta dell'ordine:", error);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

module.exports = router;
