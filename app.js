const sqlite3 = require("sqlite3").verbose(); // verbose to produce long stack traces
const express = require("express");

const app = express();
const server = http.createServer(app);

const port = 3000;

app.get("/", (req, res) => {
	res.send("hello world!");
});

app.listen(port, () => {
	console.log(`adamu is now listening on port ${port}`);
});
