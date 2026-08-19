const { PACE_THRESHOLDS } = require("./config");

function calculatePace(distanceKm, totalTimeMinutes) {
  return totalTimeMinutes / distanceKm;
}

function getCategory(pace) {
  if (pace >= PACE_THRESHOLDS.ZONE_2_MIN) {
    return "Zone 2";
  }

  if (pace >= PACE_THRESHOLDS.THRESHOLD_MIN) {
    return "Threshold";
  }

  return "Sprint";
}

module.exports = {
  calculatePace,
  getCategory
};