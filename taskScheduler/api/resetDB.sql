DROP TABLE IF EXISTS TASKS;

CREATE TABLE "tasks" (
	"id"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	"category"	INTEGER NOT NULL,
	"starting_time"	REAL NOT NULL,
	"deadline"	REAL NOT NULL,
	"estimated_duration"	INTEGER NOT NULL,
	"actual_duration"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY(category) REFERENCES categories(id)
);

DROP TABLE IF EXISTS categories;

CREATE TABLE "categories" (
	"id"	INTEGER NOT NULL,
	"category"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);