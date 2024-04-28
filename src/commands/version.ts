import type { Command } from "../types/Command";
import meta from "../../package.json";

export const version: Command = {
	"name": "Version",
	"description": "Prints the version and exits.",
	"run": () => {
		Bun.write(Bun.stdout, meta.version);
	}
};
