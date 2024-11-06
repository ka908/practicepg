const express = require("express");
const router = express.Router();
const booking = require("./bookings");

router.post("/bookings", booking);

module.exports = router;
