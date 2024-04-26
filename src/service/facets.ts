import type { ServiceFacets } from "../types/Facets";
import { log } from "../log";
import { toSnakeCase } from "../util/toSnakeCase";

function formatPair(key: string, value: string) {
	return `"${key}:${value}"`;
}

export function processFacets(serviceFacets: ServiceFacets) {
	log.info("Processing facets...");
	log.debug(JSON.stringify(serviceFacets));

	serviceFacets.categories ??= [];
	if (serviceFacets.loaders !== "*") {
		serviceFacets.categories.push(...serviceFacets.loaders);
	}

	delete serviceFacets.loaders;

	const serialized: string[] = [];
	for (const [key, value] of Object.entries(serviceFacets)) {
		if (value === "*" || value.length === 0) {
			continue;
		}

		const serializedKey = toSnakeCase(key);
		let pair: string;

		if (Array.isArray(value)) {
			const or: string[] = [];

			for (const option of value) {
				or.push(formatPair(serializedKey, option));
			}

			pair = or.join(",");
		} else {
			pair = formatPair(key, value);
		}

		serialized.push(`[${pair}]`);
	}

	const serializedFacets = `[${serialized.join(",")}]`;

	log.info("Finished facet serialization!");
	log.debug(serializedFacets);

	return serializedFacets;
}
