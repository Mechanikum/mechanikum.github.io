import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import type {Loader} from 'astro/loaders';

const rel = (abs: string) => '/' + path.relative(process.cwd(), abs).replace(/\\/g, '/');

export function projectsLoader(): Loader {
	return {
		name: 'projects-loader',
		async load({store, parseData, generateDigest, renderMarkdown, logger}) {
			logger.info('Loading projects');
			store.clear();

			const metaFiles = await fg('src/assets/projects/*/meta.json', {absolute: true});

			await Promise.all(
				metaFiles.map(async (metaFile) => {
					const projectDir = path.dirname(metaFile);
					const slug = path.basename(projectDir);

					const meta = JSON.parse(await fs.readFile(metaFile, 'utf8'));
					const descRaw = await fs.readFile(path.join(projectDir, 'description.md'), 'utf8');

					const data = await parseData({
						id: slug,
						data: {
							...meta
						},
						filePath: rel(path.join(projectDir, 'description.md')),
					});

					store.set({
						id: slug,
						data,
						digest: generateDigest({...data, desc: descRaw}),
						rendered: await renderMarkdown(descRaw),
					});
				}),
			);

			logger.info('Projects loaded');
		},
	};
}

export const getImage = <T>(obj: Record<string, T>, slug: string) => (Object.entries(obj)
	.find(([p]) => p.includes(`/${slug}/`))?.[1] as any)

export const getGallery = <T>(obj: Record<string, T>, slug: string) => Object.entries(obj)
	.map(([p, value]) => {
		if (p.includes(`/${slug}/`)) return (value as any)
	})
	.filter(v => v != undefined)