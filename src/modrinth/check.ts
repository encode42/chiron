import type { NewProject } from "../types/NewProject";
import type { SearchIndex } from "../types/SearchIndex";
import { getProject, setProject } from "../database";
import { search } from "./search";
import { log } from "../log";

export async function check(facets: string, index?: SearchIndex) {
	const hits = await search(facets, index);

	const newProjects: NewProject[] = [];
	for (const hit of hits) {
		log.debug(`Found "${hit.title}"`);

		const knownProject = getProject(hit.project_id);
		if (knownProject) {
			log.debug("...which has already been found!");
			continue;
		}

		setProject(hit.project_id);

		newProjects.push({
			"type": hit.project_type,
			"title": hit.title,
			"url": `https://modrinth.com/${hit.project_type}/${hit.project_id}`,
			"description": hit.description,
			"thumbnail": hit.icon_url,
			"color": hit.color
		});
	}

	if (newProjects.length > 0) {
		log.info(`Found and processed ${newProjects.length} new projects!`);
	} else {
		log.debug("No new projects found.");
	}

	return newProjects;
}
