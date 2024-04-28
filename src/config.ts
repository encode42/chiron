import type { Config } from "./types/Config";
import { access, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import resource from "../resources/config.toml" with { type: "text" };

interface ConfigModule {
	"default": Config;
}

const file = resolve("config.toml");

async function read(): Promise<ConfigModule> {
	try {
		await access(file);
	} catch {
		await writeFile(file, resource);
	}

	return await import(file);
}

const module = await read();
export const config = module.default;
