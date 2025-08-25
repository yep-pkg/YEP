// Dogs***t database management
const fs = require("fs");
const path = require("path");
const dbPath = path.join(process.env.HOME || process.env.USERPROFILE, ".yep-db.json");

function loadDb() {
  return fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
}

function saveDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

module.exports = { loadDb, saveDb };
