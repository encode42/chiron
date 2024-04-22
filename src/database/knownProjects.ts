import type { StoredProject } from "../types/StoredProject";
import { FileDatabse } from "./file";

const knownProjects = new FileDatabse<StoredProject>({
	"name": "knownProjects"
});

await knownProjects.load();

export { knownProjects };
