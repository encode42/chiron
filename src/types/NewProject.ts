import type { Project } from "@xmcl/modrinth";

export interface NewProject {
	"type": Project["project_type"];
	"title": Project["title"];
	"url": string;
	"description": Project["description"];
	"thumbnail"?: string;
	"color": number;
}
