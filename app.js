const sqlite3 = require("sqlite3").verbose(); // verbose to produce long stack traces
const { createDecipheriv } = require("crypto");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("todos.db"); // creates a .db file (persisting db)
// const db = new sqlite3.Database(":memory:"); // creates an in-memory db (temp db)
const port = 3000;

app.use(express.json()); // middleware to handle & parse JSON data

db.serialize(() => {
	db.run(
		`
			CREATE TABLE IF NOT EXISTS todos (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			completed BOOLEAN NOT NULL DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`,
		(err) => {
			if (err) {
				console.error("Error creating table: ", err);
			} else {
				console.log("Table created successfully or already exists");
			}
		}
	);
});

app.get("/", (req, res) => {
	res.send("hello world!");
});

app.listen(port, () => {
	console.log(`adamu is now listening on port ${port}`);
});

// API: (POST, /todos) create new todo item
app.post("/todos", (req, res) => {
	const data = req.body;
	const params = [data.name, data.completed ? 1 : 0];
	const query = "INSERT INTO todos (name, completed) VALUES (?, ?)";

	db.run(query, params, function (err) {
		if (err) {
			return res.status(500).json({ error: err.message }); // return error message if query fails
		}
		res.status(201).json({
			id: this.lastID,
			name: data.name,
			completed: data.completed ? 1 : 0,
			created_at: new Date().toISOString(),
		}); // else return the new todo item that has been inserted into db
	});
});
