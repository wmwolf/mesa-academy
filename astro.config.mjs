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
				Sidebar: './src/components/Sidebar.astro',
				PageSidebar: './src/components/PageSidebar.astro',
			},
			title: 'MESA Academy',
			logo: {
				light: '/src/assets/small-logo.svg',
				dark: '/src/assets/small-logo-dark.svg',
				replacesTitle: true
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/wmwolf/mesa-academy' }],
			sidebar: [
				{
					label: 'Getting Started',
					collapsed: true,
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'About These Tutorials', slug: 'tutorials/00-about-these-tutorials' },
						{ label: 'Prerequisites and Setup', slug: 'tutorials/01-prerequisites-and-setup' },
						{ label: 'MESA Work Directories', slug: 'tutorials/02-mesa-work-directories' },
						{ label: 'Inlists and Outputs', slug: 'tutorials/03-inlists-and-outputs' },
					],
				},
			],
			customCss: ['./src/styles/global.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						src: '/mesa-academy/progress-tracker.js',
						type: 'module'
					}
				},
				{
					tag: 'script',
					attrs: {
						'data-goatcounter': 'https://mesa-academy.goatcounter.com/count',
						async: true,
						src: '//gc.zgo.at/count.js'
					},
					content: `
						// Only load GoatCounter in production
						if (window.location.hostname === 'localhost' || 
						    window.location.hostname === '127.0.0.1' || 
						    window.location.hostname.endsWith('.local')) {
							document.currentScript.remove();
						}
					`
				}
			],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
