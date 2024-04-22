import { services } from "../data/config";
import { startService } from "./service/start";
import { log } from "./log";

// TODO:
// - implement project version protection

log.info("Registering all configured services...");

for (const service of services) {
	await startService(service);
}

log.info("Services have been registered!");
