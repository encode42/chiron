import type { ServiceFacets } from "./Facets";
import type { Snowflake } from "discord.js";
import type { SearchIndex } from "./SearchIndex";

export interface Service {
	"title"?: string;
	"search": ServiceFacets;
	"sort"?: SearchIndex;
	"webhook": {
		"url": string;
		"threadId"?: Snowflake;
	};
	"interval"?: number;
}
