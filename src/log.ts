import { pino } from "pino";
import { config } from "./config";

export const log = pino({
	"level": config.extra.verbose ? "debug" : "info",
	"transport": {
		"target": "pino-pretty",
		"options": {
			"ignore": "pid,hostname"
		}
	}
});
