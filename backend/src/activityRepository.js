const db = require("./database");

function saveActivity(activity) {
  const statement = db.prepare(`
    INSERT INTO activities (
      distance_km,
      total_time_minutes,
      average_pace,
      category,
      created_at
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = statement.run(
    activity.distanceKm,
    activity.totalTimeMinutes,
    activity.averagePace,
    activity.category,
    activity.createdAt
  );

  return {
    id: result.lastInsertRowid,
    ...activity
  };
}

function getActivities() {
  const statement = db.prepare(`
    SELECT
      id,
      distance_km AS distanceKm,
      total_time_minutes AS totalTimeMinutes,
      average_pace AS averagePace,
      category,
      created_at AS createdAt
    FROM activities
    ORDER BY id DESC
  `);

  return statement.all();
}

function clearActivities() {
  const statement = db.prepare(`DELETE FROM activities`);
  const result = statement.run();
  return result.changes; // number of rows deleted
}

module.exports = {
  saveActivity,
  getActivities,
  clearActivities
};