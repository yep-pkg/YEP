// Dogs***t database management
import fs from "fs";
import path from "path";
const dbPath = path.join(process.env.HOME || process.env.USERPROFILE, ".yep-db.json");

export function loadDb() {
  return fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};
}

export function saveDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}
