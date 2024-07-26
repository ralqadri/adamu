const sqlite3 = require("sqlite3").verbose(); // verbose to produce long stack traces
const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database("todos.db"); // creates a .db file (persisting db)
// const db = new sqlite3.Database(":memory:"); // creates an in-memory db (temp db)
const port = 3000;

app.use(express.json()); // middleware to handle & parse JSON data
app.use(cors());
app.use(express.static("../frontend/public"));

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

// API: (GET, /todos) get all todo items
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

// API: (GET, /todos/:id) get specific todo item from id
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

// API: (PATCH, /todos/) change/update both name and completed status of a todo item
app.patch("/todos", (req, res) => {
	// this doesn't need :id parameter because of PATCH uses the request body
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

// API: (PATCH, /todos/name/:id/) change/update name of a todo item
app.patch("/todos/name/:id", (req, res) => {
	const data = req.body;
	const query = "UPDATE todos SET name = ? WHERE id = ?";
	const params = [data.name, req.params.id];

	const updatedItem = {
		id: req.params.id,
		name: data.name,
	};

	db.run(query, params, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(200).json({
			message: "Todo item name changed successfully!",
			data: updatedItem,
		});
	});
});

// API: (PATCH, /todos/completed/:id) switch/update completed status of a todo item
app.patch("/todos/completed/:id", (req, res) => {
	const data = req.body;
	const query = "UPDATE todos SET completed = ? WHERE id = ?";
	const params = [data.completed ? 1 : 0, req.params.id];

	const updatedItem = {
		id: req.params.id,
		completed: data.completed ? 1 : 0,
	};

	db.run(query, params, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.status(500).json({
			message: "Todo item completed status switched successfully!",
			data: updatedItem,
		});
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
