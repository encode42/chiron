import { log } from "./log";
import meta from "../package.json";
import * as commands from "./commands/commands";

const selectedCommand = commands[Bun.argv[2]];
if (selectedCommand) {
	await selectedCommand.run();
} else {
	log.info(`${meta.name} v${meta.version}`);
	log.info(`	${meta.description}`);
	log.info(`	Maintained by ${meta.author.name} (${meta.author.email})`);
	log.info("");
	log.info("Available commands:");

	for (const [command, value] of Object.entries(commands)) {
		log.info(`	${value.name} - ${value.description}`);
		log.info(`		Usage: ${meta.name} ${command}`);
	}
}
