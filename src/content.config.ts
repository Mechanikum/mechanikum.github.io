import { defineCollection, z } from 'astro:content';
import {projectsLoader} from "@/lib/projects-loader";


const projects = defineCollection({
	loader: projectsLoader(),
	schema: z.object({
		name: z.string(),
		tags: z.array(z.string())
	})
});

export const collections = { projects };