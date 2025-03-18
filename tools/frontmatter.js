import addFrontMatter from "./add-frontmatter.js";

const args = process.argv.slice(2);
const path = args[0];

console.log(`Processing ${path}`)

addFrontMatter(path);

console.log(`Done`);