import { pino } from "pino";
import { extras } from "../data/config";

export const log = pino({
	"level": extras.verbose ? "debug" : "info",
	"transport": {
		"target": "pino-pretty",
		"options": {
			"ignore": "pid,hostname"
		}
	}
});
