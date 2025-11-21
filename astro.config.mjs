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
					label: 'Section I: Getting Started',
					items: [
						{ label: 'About These Tutorials', slug: 'tutorials/00-about-these-tutorials' },
						{ label: 'Prerequisites and Installation', slug: 'tutorials/01-prerequisites-and-installation' },
						{ label: 'The Standard Work Directory', slug: 'tutorials/02-the-standard-work-directory' },
						{ label: 'Working with MESA Output', slug: 'tutorials/03-working-with-mesa-output' },
						{ label: 'Controlling MESA with Inlists', slug: 'tutorials/04-controlling-mesa-with-inlists' },
						{ label: 'The MESA Test Suite', slug: 'tutorials/05-the-mesa-test-suite' },
					],
				},
				{
					label: 'Section II: Going Deeper',
					items: [
						{ label: 'Mastering Pgstar', slug: 'tutorials/06-mastering-pgstar' },
						{ label: 'Getting Started with run_star_extras.f90', slug: 'tutorials/07-getting-started-with-run-star-extras' },
						{ label: 'Implementing Custom Physics with Hooks', slug: 'tutorials/08-implementing-custom-physics-with-hooks' },
						{ label: 'Adding Custom Output and Variables', slug: 'tutorials/09-adding-custom-output-and-variables' },
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
