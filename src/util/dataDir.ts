import { resolve } from "node:path";
import { access, mkdir } from "node:fs/promises";

const dataDir = resolve("data/");

try {
	await access(dataDir);
} catch {
	await mkdir(dataDir);
}

export { dataDir };
