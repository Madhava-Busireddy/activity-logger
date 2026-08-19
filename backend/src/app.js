const express = require("express");
const cors = require("cors");
const {
  createActivity,
  listActivities
} = require("./activityService");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/activities", (req, res) => {
  try {
    const { distanceKm, totalTimeMinutes } = req.body;

    const activity = createActivity(
      distanceKm,
      totalTimeMinutes
    );

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

app.get("/api/activities", (req, res) => {
  try {
    const activities = listActivities();

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve activities"
    });
  }
});

module.exports = app;