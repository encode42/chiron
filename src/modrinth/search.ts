import { ModerinthApiError, type SearchResult, type SearchResultHit } from "@xmcl/modrinth";
import type { SearchIndex } from "../types/SearchIndex";
import { client } from "./client";
import { log } from "../log";

type CorrectHit = SearchResultHit & {
	"color": number;
};

export async function search(facets: string, index: SearchIndex = "newest") {
	log.info("Searching Modrinth for new projects...");
	log.debug(facets);

	let response: SearchResult;
	try {
		response = await client.searchProjects({
			"index": "newest",
			"facets": facets
		});
	} catch (error) {
		if (error instanceof ModerinthApiError && error.status >= 500 && error.status < 600) {
			log.error("Failed to search! Will try again during next interval...");
			log.debug(error);

			return [];
		}

		throw error;
	}

	log.info("Finished searching!");
	return response.hits as CorrectHit[];
}
