#!/usr/bin/env node

const { install } = require("./lib/install.js");
const { search } = require("./lib/search.js");
const { remove } = require("./lib/remove.js");

const cmd = process.argv[2];
const arg = process.argv[3];

if (!cmd) {
  console.log("YEP - Yet another package manager")
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
  case "install":
    if (!arg) {
      console.error("Specify a package name");
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
      console.error("Specify a package to remove");
      process.exit(1);
    }
    remove(arg);
    break;

  case "search":
    if (!arg) {
      console.error("Specify a search term");
      process.exit(1);
    }
    search(arg);
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
}
