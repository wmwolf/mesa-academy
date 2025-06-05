// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import starlightVersions from 'starlight-versions'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
        		starlightVersions({
          			versions: [{ slug: '1.0' }],
        		}),
			],
			title: 'MESA Academy',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/wmwolf/mesa-academy' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'About These Guides', slug: 'guides/about-these-guides' },
						{ label: 'Prerequisites and Setup', slug: 'guides/prerequisites-and-setup' },
						{ label: 'MESA Work Directories', slug: 'guides/mesa-work-directories' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'examples' },
				},
			],
			customCss: ['./src/styles/global.css'],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
