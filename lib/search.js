
import axios from "axios";
import { getRepos } from "./config.js";
import chalk from "chalk";

export async function search(term) {
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
      console.error(chalk.bgRed("   ERROR   "), `No results found for '${term}' in any repo.`);

  }
}
