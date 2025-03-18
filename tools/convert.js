import addFrontmatter from "./add-frontmatter.js";
import addSection from "./add-section.js";

const args = process.argv.slice(2);
const path = args[0];
const root = args[1];

console.log(`Processing ${path}`)

addSection(path, root);
addFrontmatter(path);

console.log(`Done`);