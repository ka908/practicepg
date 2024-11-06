const express = require("express");
const router = express.Router();
const db = require("../database.js");

router.post("/facility", async (req, res) => {
  try {
    const members = await db("facility").insert(req.body);
    return res.json(members);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
