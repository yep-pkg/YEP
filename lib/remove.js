import fs from "fs";
import path from "path";
import { loadDb, saveDb } from "./db.js";

const INSTALL_PREFIX = "/usr/local/yep/bin"; // same as install path

export function remove(pkg) {
  const db = loadDb();
  if (!db[pkg]) {
    console.error(`${pkg} is not installed.`);
    process.exit(1);
  }

  // Remove binary
  const binPath = path.join(INSTALL_PREFIX, pkg);
  if (fs.existsSync(binPath)) {
    fs.unlinkSync(binPath);
    console.log(`Removed binary: ${binPath}`);
  }

  // Remove from DB
  delete db[pkg];
  saveDb(db);
  console.log(`Package '${pkg}' removed.`);
}
