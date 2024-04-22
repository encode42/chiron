import type { SearchResultHit } from "@xmcl/modrinth";
import type { SearchIndex } from "../types/SearchIndex";
import { client } from "./client";
import { log } from "../log";

type CorrectHit = SearchResultHit & {
	"color": number;
};

export async function search(facets: string, index: SearchIndex = "newest") {
	log.info("Searching Modrinth for new projects...");
	log.debug(facets);

	const response = await client.searchProjects({
		"index": "newest",
		"facets": facets
	});

	log.info("Finished searching!");
	return response.hits as CorrectHit[];
}
