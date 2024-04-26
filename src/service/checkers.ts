import type { EmbedData } from "discord.js";
import type { Project } from "@xmcl/modrinth";
import type { Client } from "../discord/client";
import type { SearchIndex } from "../types/SearchIndex";
import { sendEmbed } from "../discord/send";
import { check } from "../modrinth/check";

interface Options {
	"types": Project["project_type"][];
	"title"?: string;
	"index"?: SearchIndex;
	"interval"?: number;
}

async function runChecker(client: Client, facets: string, options: Options) {
	const newProjects = await check(facets, options.index);

	for (const newProject of newProjects) {
		if (!options.types.includes(newProject.type)) {
			continue;
		}

		const embed: EmbedData = {
			"title": newProject.title,
			"url": newProject.url,
			"description": newProject.description,
			"color": newProject.color
		};

		if (newProject.thumbnail) {
			embed.thumbnail = {
				"url": newProject.thumbnail,
				"height": 256,
				"width": 256
			};
		}

		if (options.title) {
			embed.footer = {
				"text": options.title
			};
		}

		sendEmbed(client, embed);
	}
}

export async function createChecker(client: Client, facets: string, options: Options) {
	options.interval ??= 30;

	const runner = async () => {
		await runChecker(client, facets, options);
	};

	await runner();
	setInterval(runner, options.interval * 1000);
}
