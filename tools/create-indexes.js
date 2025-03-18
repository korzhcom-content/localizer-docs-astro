import fs from 'fs';
import path from 'path';

if (process.argv.length < 3) {
    console.error("Usage: node create_index.js <folder path>");
    process.exit(1);
}

const rootFolder = process.argv[2];

function processFolder(folderPath) {
    const sectionFile = path.join(folderPath, '__section.md');
    const indexFile = path.join(folderPath, 'index.md');

    if (fs.existsSync(sectionFile)) {
        console.log(`Processing ${sectionFile}`);
        let content = fs.readFileSync(sectionFile, 'utf8');
        let lines = content.split('\n');

        let captionIndex = lines.findIndex(line => line.startsWith('#'));
        if (captionIndex !== -1) {
            let caption = lines[captionIndex].replace(/^#+\s*/, ''); // Remove '#' and spaces
            lines.splice(captionIndex, 1); // Remove the heading from content

            const frontMatter = `---\ntitle: ${caption}\n---\n\n`;
            content = frontMatter + lines.join('\n');

            fs.writeFileSync(indexFile, content, 'utf8');
            console.log(`Updated ${indexFile} with title: ${caption}`);
        } else {
            console.warn(`No heading found in ${sectionFile}, skipping update.`);
        }
    }
}

function walkDirectory(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDirectory(fullPath);
            processFolder(fullPath);
        }
    });
}

walkDirectory(rootFolder);
console.log("Processing complete.");
