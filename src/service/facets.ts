import type { Facets, ServiceFacets } from "../types/Facets";
import { log } from "../log";
import { toSnakeCase } from "../util/toSnakeCase";

export function processFacets(serviceFacets: ServiceFacets) {
	log.info("Processing facets...");
	log.debug(JSON.stringify(serviceFacets));

	const facets: Facets = { ...serviceFacets };
	const projectTypes = serviceFacets.projectTypes;

	facets.categories ??= [];
	if (serviceFacets.loaders !== "*") {
		facets.categories.push(...serviceFacets.loaders);
	}

	delete facets.loaders;
	delete facets.projectTypes;

	const serializedFacets: string[] = [];
	for (const projectType of projectTypes) {
		facets.projectType = projectType;

		const serialized: string[] = [];
		for (const [key, value] of Object.entries(facets)) {
			if (value === "*" || value.length === 0) {
				continue;
			}

			serialized.push(`["${toSnakeCase(key)}:${value}"]`);
		}

		serializedFacets.push(`[${serialized.join(",")}]`);
	}

	log.info("Finished facet serialization!");
	log.debug(JSON.stringify(serializedFacets));

	return serializedFacets;
}
