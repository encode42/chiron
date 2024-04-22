import { ModrinthV2Client } from "@xmcl/modrinth";
import { extras } from "../../data/config";

export const client = new ModrinthV2Client({
	"headers": {
		"User-Agent": `encode42/chiron (${extras.email})`
	}
});
