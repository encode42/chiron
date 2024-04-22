import type { Service } from "../src/types/Service";

/**
 * NOTE:
 * This file is best edited in an IDE such as Visual Studio Code!
 *
 * Doing so will automatically display valid autocomplete options.
 *
 * @see https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
 */

/**
 * Services define what to search for.
 *
 * @example
 * For example, a service could check for new mods created for Fabric 1.20.4.
 *
 * Another service could observe whether a new mod has appeared in the top search results.
 */
export const services: Service[] = [
	/**
	 * Basic example used in the real-world.
	 */
	{
		"webhook": {
			/**
			 * @see https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
			 */
			"url": "https://discord.com/api/webhooks/.../..."
		},
		/**
		 * @see https://docs.modrinth.com/#tag/projects/operation/searchProjects
		 */
		"search": {
			"versions": ["1.20.1"],
			"projectTypes": ["mod"],
			"loaders": ["forge"]
		}
	},
	/**
	 * An example with all available fields (except for "search") filled out.
	 */
	{
		/**
		 * Title will be displayed in logs and the embeds' footer
		 */
		"title": "Resource Packs",
		/**
		 * To send webhooks in a thread or forum post:
		 */
		"webhook": {
			"url": "https://discord.com/api/webhooks/.../...",
			"threadId": "..."
		},
		"sort": "updated",
		"search": {
			"versions": "*",
			"projectTypes": ["resourcepack"],
			"loaders": "*"
		},
		/**
		 * Unit is in seconds.
		 */
		"interval": 120
	}
];

export const extras = {
	"email": "me@encode42.dev",
	"checkVersions": true,
	"verbose": false
};
