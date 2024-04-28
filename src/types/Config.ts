import type { Service } from "./Service";

export interface Config {
	"service": Service[];
	"extra": {
		"email": string;
		"verbose": boolean;
	};
}
