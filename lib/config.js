const fs = require("fs");
const yaml = require("yaml");

const CONFIG_PATH = "/etc/yep/config.yaml";

function getRepos() {
  if (!fs.existsSync(CONFIG_PATH)) {
    // Default repo if config missing
    return [{ name: "Main Repository", url: "https://yep-pkg.github.io/YEP-repo/" }];
  }
  const config = yaml.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
  if (!config.repos || typeof config.repos !== "object") {
    return [{ name: "Main Repository", url: "https://yep-pkg.github.io/YEP-repo/" }];
  }
  // Convert repos object to array of {name, url}
  return Object.values(config.repos).map(repo => ({
    name: repo.name,
    url: repo.url
  }));
}

module.exports = { getRepos };
