import { ModrinthV2Client } from "@xmcl/modrinth";
import { config } from "../config";

export const client = new ModrinthV2Client({
	"headers": {
		"User-Agent": `encode42/chiron (${config.extra.email})`
	}
});
