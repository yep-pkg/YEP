import fs from "fs";
import path from "path";
import axios from "axios";
import { loadDb, saveDb } from "./db.js";
import { execSync } from "child_process";
import { getRepos } from "./config.js";

export async function install(pkg) {
  const db = loadDb();
  if (db[pkg]) {
    console.log(`${pkg} is already installed.`);
    return;
  }

  const repos = getRepos();
  let found = false;
  for (const REPO_URL of repos) {
    try {
      const metaUrl = `${REPO_URL}${pkg}/data.yep.json`;
      const meta = (await axios.get(metaUrl)).data;

      // --- OS check ---
      const currentOS = process.platform; // 'linux', 'darwin', 'win32'
      if (meta.os && !meta.os.includes(currentOS)) {
        console.error(
          `Package '${pkg}' is not supported on ${currentOS}. Supported: ${meta.os.join(", ")}`
        );
        process.exit(1);
      }

      const version = meta.version;
      const versionPath = meta.versions[version];

      const tmpDir = path.join("/tmp", `yep-${pkg}`);
      fs.mkdirSync(tmpDir, { recursive: true });

      // Run compile steps if defined
      if (meta.compile) {
        for (const step of Object.keys(meta.compile).sort()) {
          console.log(`Running compile step ${step}: ${meta.compile[step]}`);
          execSync(meta.compile[step], { stdio: "inherit", cwd: tmpDir });
        }
      }

      db[pkg] = version;
      saveDb(db);
      console.log(`Installed ${pkg} ${version}`);
      found = true;
      break;
    } catch (err) {
      // Try next repo
      continue;
    }
  }
  if (!found) {
    console.error(`Install failed: ${pkg} not found in any repo.`);
  }
}