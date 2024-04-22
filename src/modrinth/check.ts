import type { NewProject } from "../types/NewProject";
import type { SearchIndex } from "../types/SearchIndex";
import { knownProjects } from "../database/knownProjects";
import { search } from "./search";
import { log } from "../log";

export async function check(facets: string, index?: SearchIndex) {
	const hits = await search(facets, index);
	const now = Date.now();

	const newProjects: NewProject[] = [];
	for (const hit of hits) {
		log.debug(`Found "${hit.title}"`);

		const knownProject = knownProjects.get(hit.project_id);
		if (knownProject) {
			log.debug("...which has already been found!");
			continue;
		}

		await knownProjects.set(hit.project_id, {
			"lastUpdate": now
		});

		newProjects.push({
			"type": hit.project_type,
			"title": hit.title,
			"url": `https://modrinth.com/${hit.project_type}/${hit.project_id}`,
			"description": hit.description,
			"thumbnail": hit.icon_url,
			"color": hit.color
		});
	}

	log.info(newProjects.length === 0 ? "No new projects found." : `Found and processed ${newProjects.length} new projects!`);

	return newProjects;
}
