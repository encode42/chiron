import { config } from "./config";
import { log } from "./log";
import { startService } from "./service/start";

// TODO:
// - implement project version protection

log.info("Registering all configured services...");

for (const service of config.service) {
	await startService(service);
}

log.info("Services have been registered!");
