// Require express.
const express = require("express");
// Require path.
const path = require("path");
//  Require file system.
const fs = require("fs");
// We also need the database.json file to read from.
const db = require("./db/db.json")
// Create port to listen at.
const PORT = 3001;
// Create a new instance of express.
const app = express();

const { readFromFile, readAndAppend } = require('./helpers/fsUtils');

// Middleware to parse JSON form data.
app.use(express.json());

// Middleware to serve static assets from the pubic folder
app.use(express.static("/assets"));

// * `GET *` should return the `index.html` file.
app.get("/", (req, resp) => {
	resp.sendFile(path.join(__dirname, "/public/index.html"));
	console.info("Viewing index.html file");
});

// * `GET /notes` should return the `notes.html` file.
app.get("/notes", (req, resp) => {
	resp.sendFile(path.join(__dirname, "/public/notes.html"))
	console.info("Viewing notes.html file");
	// return resp.json(db);
});

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, resp) => {
	fs.readFile("./db/db.json", "utf8", (error, data) => {
		error ? console.log(error) : console.log(data)
	// .then((data) => {
	// 	let itemsToBeReturned = data.json;
	// 	return itemsToBeReturned;
	// 	});
	});
	// readFromFile('./db/db.json').then((data) => resp.json(JSON.parse(data)));
	// // data is currently undefined.
	// console.log(data);
});``

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/notes", (req, resp) => {
	fs.writeFile("./db/db.json", )

	console.info(`user input validated.`);
	console.info(req.rawHeaders);

	resp = {
		// status: "success",
		data: req.body
	};
	// resp.json(`item ${resp.data} added.`);
	console.log(resp.data);

	console.log(req.body);
});

app.listen(PORT, () => {
	console.log(`app is listening at http:localhost:${PORT}`);
});