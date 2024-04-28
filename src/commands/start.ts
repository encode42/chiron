import { config } from "../config";
import { log } from "../log";
import { startService } from "../service/start";
import type { Command } from "../types/Command";

export const start: Command = {
	"name": "Start",
	"description": "Processes and starts all configured services.",
	"run": async () => {
		log.info("Registering all configured services...");

		for (const service of config.service) {
			await startService(service);
		}

		log.info("Services have been registered!");
	}
};
