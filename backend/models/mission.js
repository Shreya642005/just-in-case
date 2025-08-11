const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    missionTitle: { type: String, required: true },
    shortDescription: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    place: { type: String, required: true },
    fullDescription: { type: String, required: true },
    imageUrl: { type: String },
    status: { type: String, default: "completed" },
    latitude: { type: String },
    longitude: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mission", missionSchema);