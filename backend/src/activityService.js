const { calculatePace, getCategory } = require("./paceCalculator");
const {
  saveActivity,
  getActivities,
  clearActivities
} = require("./activityRepository");

function validateActivityInput(distanceKm, totalTimeMinutes) {
  if (distanceKm === undefined || distanceKm === null || distanceKm === "") {
    throw new Error("Distance is required");
  }

  if (!Number.isFinite(Number(distanceKm))) {
    throw new Error("Distance must be a number");
  }

  if (Number(distanceKm) <= 0) {
    throw new Error("Distance must be greater than 0");
  }

  if (
    totalTimeMinutes === undefined ||
    totalTimeMinutes === null ||
    totalTimeMinutes === ""
  ) {
    throw new Error("Total time is required");
  }

  if (!Number.isFinite(Number(totalTimeMinutes))) {
    throw new Error("Total time must be a number");
  }

  if (Number(totalTimeMinutes) <= 0) {
    throw new Error("Total time must be greater than 0");
  }
}

function createActivity(distanceKm, totalTimeMinutes) {
  validateActivityInput(distanceKm, totalTimeMinutes);

  const distance = Number(distanceKm);
  const totalTime = Number(totalTimeMinutes);

  const averagePace = calculatePace(distance, totalTime);
  const category = getCategory(averagePace);

  const activity = {
    distanceKm: distance,
    totalTimeMinutes: totalTime,
    averagePace,
    category,
    createdAt: new Date().toISOString()
  };

  return saveActivity(activity);
}

function listActivities() {
  return getActivities();
}

function clearAllActivities() {
  return clearActivities();
}

module.exports = {
  createActivity,
  listActivities,
  clearAllActivities,
  validateActivityInput
};