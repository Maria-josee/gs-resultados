// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://gs-resultados.netlify.app/ https://Maria-josee.github.io/gs-informe
// https://astro.build/config
export default defineConfig({
	site: 'https://gs-resultados.netlify.app/',

	//  Aquí va la config global de markdown para Astro 
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},

	integrations: [
		starlight({
			title: 'Gaussian Splatting',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/withastro/starlight',
				},
			],
			sidebar: [
				{
					label: 'Metodología',
					items: [
						{ label: 'Configuraciones', slug: 'guides/configuraciones' },
						{ label: 'Métricas', slug: 'guides/metricas' },
					],
				},
				{
					label: 'Resultados',
					autogenerate: { directory: 'reconstrucciones' },
				},
				{
					label: 'Recomendaciones',
					autogenerate: { directory: 'recomendaciones' },
				},
			],

			// necesario para las formulas
			customCss: ['./src/styles/katex.css'],
		}),
	],
});
