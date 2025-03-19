// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import { rehypeLinks } from './plugins/rehype-links';
import { updateFrontmatter } from './plugins/update-frontmatter';
import getSidebar from "./tools/generate-sidebar.js"

const base = 'localizer/docs';

// https://astro.build/config
export default defineConfig({
	base,
	trailingSlash: "never",
	integrations: [
		starlight({
			title: 'Localizer',
			favicon: '/favicon.ico',
			social: {
				github: 'https://github.com/korzhcom-content/localizer-docs-astro',
				discord: 'https://discord.gg',
			},
			sidebar: [
				...getSidebar("./src/content/docs/localizer/docs/introduction", true),
				...getSidebar("./src/content/docs/localizer/docs/language-wizard", true),
				...getSidebar("./src/content/docs/localizer/docs/language-manager", true),
				...getSidebar("./src/content/docs/localizer/docs/localizer-reference", true),
			],
			customCss: [
				'./src/styles/index.css',
			],
			components: {
				Footer: './src/components/Footer.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			lastUpdated: true,
			plugins: [
				starlightThemeRapide(),
			],
			tableOfContents: {
				minHeadingLevel: 2,
				maxHeadingLevel: 4,
			},
			credits: false,
		}),
	],
	markdown: {
		//		rehypePlugins: [[rehypeLinks, { base }]],
		remarkPlugins: [updateFrontmatter]
	}
});
