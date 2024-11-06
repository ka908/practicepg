const express = require("express");
const router = express.Router();
const db = require("../database.js");

const booking = async (req, res) => {
  try {
    const members = await db("bookings").insert(req.body);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = booking;
