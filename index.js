#!/usr/bin/env node

import { install } from "./lib/install.js";
import { search } from "./lib/search.js";
import { remove } from "./lib/remove.js";
import chalk from "chalk";

const cmd = process.argv[2];
const arg = process.argv[3];

if (!cmd) {
  console.log(chalk.blue("YEP"), "- Yet another package manager")
  console.log("The universal package manager")
  console.log("------->")
  console.log("help - All subcommands")
  console.log("install <package> - Install the package you specified")
  console.log("search <package> - look up the package you specified")
  console.log("remove <package> - remove the package you installed")
  console.log("That's all.")
  process.exit(1)
}

switch (cmd) {
  case "list": {
    const { loadDb } = await import("./lib/db.js");
    const db = loadDb();
    const pkgs = Object.keys(db);
    if (pkgs.length === 0) {
      console.log(chalk.bgYellow("   INFO   "), "No packages installed.");
    } else {
      console.log(chalk.bgBlue("   INSTALLED   "));
      pkgs.forEach(pkg => console.log(`- ${pkg} (${db[pkg]})`));
    }
    process.exit(0);
  }
  case "update": {
    if (!arg) {
      console.error(chalk.bgRed("   ERROR   "), "Specify a package to update");
      process.exit(1);
    }
    if (arg === "yep") {
      // Self-update logic (placeholder)
      console.log(chalk.bgBlue("   INFO   "), "Updating yep CLI...");
      // You can add your own update logic here, e.g. download latest release and replace current file
      console.log(chalk.bgGreen("   SUCCESS   "), "Yep CLI updated (simulated)");
      process.exit(0);
    } else {
      const { install } = await import("./lib/install.js");
      console.log(chalk.bgBlue("   INFO   "), `Updating package: ${arg}`);
      await install(arg);
      process.exit(0);
    }
  }
  case "genconfig": {
    const fs = await import("fs");
    const path = await import("path");
    const configDir = "/etc/yep";
    const configPath = path.join(configDir, "config.yaml");
    const defaultConfig = `repos:\n  main:\n    name: 'Main Repository'\n    url: 'https://yep-pkg.github.io/YEP-repo/'\n`;
    try {
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, defaultConfig);
        console.log(chalk.bgGreen("   SUCCESS   "), `Config generated at ${configPath}`);
      } else {
        console.log(chalk.bgYellow("   INFO   "), `Config already exists at ${configPath}`);
      }
    } catch (err) {
      console.error(chalk.bgRed("   ERROR   "), `Failed to write config: ${err.message}`);
      process.exit(1);
    }
    process.exit(0);
  }
  case "install":
    if (!arg) {
      console.error(chalk.bgRed("   ERROR   "), "Specify a package name");
      process.exit(1);
    }
    install(arg);
    break;
  case "help":
    console.log("YEP - Yet another package manager")
    console.log("The universal package manager which meows and mrrps")
    console.log("------->")
    console.log("help - All subcommands")
    console.log("install <package> - Install the package you specified")
    console.log("search <package> - look up the package you specified")
    console.log("remove <package> - remove the package you installed")
    console.log("That's all.")
    process.exit(1)
  case "remove":
    if (!arg) {
      console.error(chalk.bgRed("   ERROR   "), "Specify a package to remove");
      process.exit(1);
    }
    remove(arg);
    break;

  case "search":
    if (!arg) {
      console.error(chalk.bgRed("   ERROR   "), "Specify a search term");
      process.exit(1);
    }
    search(arg);
    break;
  default:
    console.error(chalk.bgRed("   ERROR   "), `Unknown command: ${cmd}`);
    process.exit(1);
}
