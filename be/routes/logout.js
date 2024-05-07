const express = require("express");
const logout = express.Router();

// Endpoint for user logout
logout.post("/logout", (req, res) => {
  try {
    res.removeHeader("Authorization");

    res.status(200).send({
      message: "Logout successful",
      statusCode: 200,
    });
  } catch (e) {
    res.status(500).send({
      message: "Internal server error",
      statusCode: 500,
    });
  }
});

module.exports = logout;
