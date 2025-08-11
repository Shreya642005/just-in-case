const express = require("express");
const router = express.Router();
const Mission = require("../models/mission");

// POST new mission
router.post("/", async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all missions
router.get("/", async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
