// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
// import starlightVersions from 'starlight-versions' // Commented out for now, will re-enable when adding versions

// https://astro.build/config
export default defineConfig({
	base: '/mesa-academy/',
	integrations: [
		starlight({
			// plugins: [
        	//	starlightVersions({
          	//		versions: [],
        	//	}),
			// ],
			components: {
				PageSidebar: './src/components/PageSidebar.astro',
			},
			title: 'MESA Academy',
			logo: {
				light: '/src/assets/my-logo.svg',
				dark: '/src/assets/my-logo-dark.svg',
				replacesTitle: true
			},
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
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/src/scripts/progress-tracker.js',
						type: 'module'
					}
				}
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
