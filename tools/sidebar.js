import getSidebar from "./generate-sidebar.js";

const args = process.argv.slice(2);
const root = args[0];

const paths = [
    "./src/content/docs/getting-started/",
    //"./src/content/docs/api-reference/",
]

const sidebar = []

for (let path of paths) {
    sidebar.push(...getSidebar(path));
}


// const sidebar = getSidebar(root);
//
//console.dir(sidebar, { depth: null });

console.log(JSON.stringify(sidebar, null, 2))