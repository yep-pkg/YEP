
const axios = require("axios");
const { getRepos } = require("./config.js");

function search(term) {
  (async () => {
    const repos = getRepos();
    let anyResults = false;
    for (const repo of repos) {
      try {
        const repoIndex = (await axios.get(`${repo.url}index.json`)).data;
        const results = repoIndex.filter(pkg => pkg.name.includes(term));
        if (results.length) {
          anyResults = true;
          results.forEach(pkg => console.log(`${pkg.name} | ${pkg.descr} | ${pkg.version} | Found on: ${repo.name}`));
        }
      } catch (err) {
        // Try next repo
        continue;
      }
    }
    if (!anyResults) {
      console.error(`No results found for '${term}' in any repo.`);
    }
  })();
}

module.exports = { search };
