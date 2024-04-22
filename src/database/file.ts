import { format } from "node:path";
import { access, writeFile, readFile } from "node:fs/promises";
import { dataDir } from "../util/dataDir";
import { log } from "../log";

interface Options {
	"name": string;
}

export class FileDatabse<T extends object> {
	#name: string;
	#path: string;

	#map = new Map<string, T>();

	#isLoaded = false;
	#saveTimeout: Timer | undefined;

	constructor(options: Options) {
		this.#name = options.name;

		this.#path = format({
			"dir": dataDir,
			"name": options.name,
			"ext": ".json"
		});
	}

	get(key: string) {
		this.#ensureLoaded();

		return this.#map.get(key);
	}

	async set(key: string, value: T) {
		this.#ensureLoaded();

		log.debug(`Setting ${key} to ${JSON.stringify(value)} on database "${this.#name}"...`);
		const existingData = this.#map.get(key) ?? {};

		this.#map.set(key, {
			...existingData,
			...value
		});

		await this.#save();

		log.debug(`Finished setting ${key}!`);
	}

	async #save() {
		if (this.#saveTimeout) {
			log.debug(`Resetting timeout on database "${this.#name}" due to modification...`);

			clearTimeout(this.#saveTimeout);
		}

		this.#saveTimeout = setTimeout(async () => {
			await this.#saveNow();

			this.#saveTimeout = undefined;
		}, 500);
	}

	async #saveNow() {
		log.debug(`Saving database "${this.#name}"...`);

		await writeFile(this.#path, JSON.stringify(Object.fromEntries(this.#map)));

		log.debug("Finished saving!");
	}

	async load() {
		log.debug(`Loading database "${this.#name}"...`);

		try {
			await access(this.#path);
		} catch {
			log.debug("It doesn't exist! Saved blank file.");

			await this.#saveNow();
			this.#isLoaded = true;
			return;
		}

		log.debug("It exists! Reading...");
		const data = JSON.parse(
			await readFile(this.#path, {
				"encoding": "utf-8"
			})
		);

		this.#map = new Map(Object.entries(data));
		this.#isLoaded = true;

		log.debug("Database loaded!");
	}

	#ensureLoaded() {
		if (this.#isLoaded) {
			return;
		}

		throw new Error(`Database "${this.#name}" is not loaded yet!`);
	}
}
