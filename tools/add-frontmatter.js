/*
* Add frontmatter to all Markdown files in the folder
* */

import { globSync } from 'glob';
import {readFileSync, writeFileSync, renameSync} from 'fs';
import {basename, dirname, sep} from 'path';

export default function addFrontmatter(path) {
    let files = globSync(`${path}/**/*.{md,mdx}`)

    for (const file of files) {
        const name = basename(file)
        console.log(name)
        if (name.startsWith('_')) {
            // skip a file
            continue
        }
        const content = readFileSync(file, 'utf-8').trim().split('\n')
        if (content[0].startsWith('---')) {
            continue
        }
        const slug = file.replace('src\\content\\docs\\', '').replace('.md', '').replaceAll('\\', '/')
        const title = content[0].replace('#', '').trim()
        const frontmatter = `---
title: ${title}
slug: ${slug}
---\n\n`

        // New content and fix links        
        let new_content = content.slice(1).join('\n')
            .replaceAll('](', '](/')
            .replaceAll('/http', 'http')
            .replaceAll('https://korzh.com/easyquery/docs', '')
        
        writeFileSync( file, frontmatter + new_content)
    }
}

