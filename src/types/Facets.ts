import type { Project } from "@xmcl/modrinth";

type ProjectType = "mod" | "modpack" | "resourcepack" | "shader" | "plugin" | "datapack";

interface BaseFacets {
	"categories"?: Project["categories"];
	"versions"?: Project["versions"] | "*";
	"clientSide"?: Project["client_side"];
	"serverSide"?: Project["server_side"];
	"openSource"?: boolean;
	"title"?: Project["title"];
	"author"?: string;
	"follows"?: Project["followers"];
	"projectId"?: Project["id"];
	"license"?: Project["license"];
	"downloads"?: Project["downloads"];
	"color"?: number;
	"createdTimestamp"?: Project["published"];
	"modifiedTimestamp"?: Project["updated"];
}

export interface Facets extends BaseFacets {
	"projectType"?: ProjectType;
}

export interface ServiceFacets extends BaseFacets {
	"projectTypes": ProjectType[];
	"loaders": Project["loaders"] | "*";
}
