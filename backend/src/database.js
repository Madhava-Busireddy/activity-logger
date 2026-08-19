const Database = require("better-sqlite3");

// const db = new Database("activity-logger.db");
const db = new Database(process.env.DATABASE_FILE || "activity-logger.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    distance_km REAL NOT NULL,
    total_time_minutes REAL NOT NULL,
    average_pace REAL NOT NULL,
    category TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`);

module.exports = db;