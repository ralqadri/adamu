const sqlite3 = require("sqlite3").verbose(); // verbose to produce long stack traces
const { createDecipheriv } = require("crypto");
const e = require("express");
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

	db.run(query, params, (err) => {
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

app.get("/todos", (req, res) => {
	const query = "SELECT * FROM todos";
	const params = [];

	db.all(query, params, (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message }); // return error message if query fails
		}
		res.status(200).json(rows); // else returns all todo items in db
	});
});

app.get("/todos/:id", (req, res) => {
	const query = "SELECT * FROM todos WHERE id = ?";
	const params = [req.params.id]; // grab the :id parameter from the URL

	db.get(query, params, (err, row) => {
		if (err) {
			return res.status(500).json({ error: err.message }); // return error message if query fails
		}
		if (!row) {
			res.status(404).json({ error: `Todo not found!` });
		}
		res.status(200).json(row);
	});
});

app.patch("/todos/", (req, res) => {
	const data = req.body;
	const query = "UPDATE todos SET name = ?, completed = ? WHERE id = ?";
	const params = [data.name, data.completed ? 1 : 0, data.id];

	const updatedItem = {
		id: data.id,
		name: data.name,
		completed: data.completed ? 1 : 0,
	};

	db.run(query, params, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message }); // return error message if query fails
		}
		res
			.status(200)
			.json({ message: "Todo item updated successfully!", data: updatedItem });
	});
});

app.delete("/todos/:id", (req, res) => {
	const query = "DELETE FROM todos WHERE id = ?";
	const params = [req.params.id];

	db.run(query, params, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message }); // return error message if query fails
		}
		res.status(200).json({
			message: "Todo item deleted successfully!",
		});
	});
});
