const fs = require("fs");
const path = require("path");
const { loadDb, saveDb } = require("./db.js");

const INSTALL_PREFIX = "/usr/local/yep/bin"; // same as install path

function remove(pkg) {
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
module.exports = { remove };
