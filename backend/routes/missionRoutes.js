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

// DELETE a mission by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Mission.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Mission not found" });
    }
    return res.json({ message: "Mission deleted", id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE all missions
router.delete("/", async (_req, res) => {
  try {
    const result = await Mission.deleteMany({});
    return res.json({ message: "All missions cleared", deletedCount: result.deletedCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
