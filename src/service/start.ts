import type { Service } from "../types/Service";
import { createClient } from "../discord/client";
import { processFacets } from "./facets";
import { createChecker } from "./checkers";
import { log } from "../log";

export async function startService(service: Service) {
	log.info(`Registering service "${service.title ?? "no title"}"`);

	const client = createClient(service.webhook.url, service.webhook.threadId);
	const separateFacets = processFacets(service.search);

	await createChecker(client, separateFacets, {
		"title": service.title,
		"types": service.search.projectTypes,
		"index": service.sort,
		"interval": service.interval
	});

	log.info("Finished registering!");
}
