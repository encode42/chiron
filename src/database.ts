import { Database } from "bun:sqlite";

const database = new Database("db.sqlite", {
	"create": true
});

database.exec("PRAGMA journal_mode = WAL;");
database
	.query(`
	CREATE TABLE IF NOT EXISTS known_projects (
		id        CHARACTER(8) PRIMARY KEY,
		last_seen DATETIME     DEFAULT CURRENT_TIMESTAMP
	);
`)
	.run();

const query = {
	"select": database.query("SELECT $id FROM known_projects;"),
	"update": database.query("UPDATE known_projects SET last_seen = datetime('now') WHERE ID = $id;"),
	"create": database.query(`
		INSERT INTO known_projects (id)
		VALUES ($id);
	`)
};

export function getProject(id: string) {
	const result = query.select.get({
		"$id": id
	});

	if (result) {
		query.update.run(id);
	}

	return result;
}

export function setProject(id: string) {
	query.create.run({
		"$id": id
	});
}
