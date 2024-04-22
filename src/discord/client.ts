import type { WebhookMessageCreateOptions } from "discord.js";
import { WebhookClient } from "discord.js";
import { log } from "../log";

export interface Client {
	"send": (options: WebhookMessageCreateOptions) => void;
}

export function createClient(url: string, threadId?: string): Client {
	log.debug(`Creating client for ${url}...`);

	const webhook = new WebhookClient({
		url
	});

	log.debug("Finished creating client!");

	return {
		"send": async (options) => {
			log.debug("Sending webhook from client...");

			await webhook.send({
				...options,
				threadId
			});

			log.debug("Sent webhook!");
		}
	};
}
