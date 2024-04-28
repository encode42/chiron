import type { EmbedData } from "discord.js";
import type { Client } from "./client";
import { EmbedBuilder } from "discord.js";

const defaultThumbnail = "https://avatars.githubusercontent.com/u/67560307?v=4";

export function sendEmbed(client: Client, data: EmbedData) {
	data.color ??= 1759337;
	data.thumbnail ??= {
		"url": defaultThumbnail
	};
	data.thumbnail.url ??= defaultThumbnail;

	const embed = new EmbedBuilder(data);
	client.send({
		"embeds": [embed]
	});
}
