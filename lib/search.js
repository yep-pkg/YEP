import axios from "axios";

const REPO_URL = "https://yet-pkg.github.io/YEP-repo/";

export async function search(term) {
  try {
    const repoIndex = (await axios.get(`${REPO_URL}index.json`)).data;
    const results = repoIndex.filter(pkg => pkg.name.includes(term));
    results.forEach(pkg => console.log(`${pkg.name} | ${pkg.descr} | (${pkg.version})`));
  } catch (err) {
    console.error("Search failed:", err.message);
  }
}
