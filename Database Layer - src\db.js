const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./votes.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      option TEXT NOT NULL
    )
  `);
});

module.exports = db;
