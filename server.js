// Require express.
const express = require("express");
// Require path.
const path = require("path");
//  Require file system.
const fs = require("fs");
// We also need the database.json file to read from.
const db = require("./db/db.json")
// Helper method for generating unique id's
// Copied from week 11, day 2, student activity 18,
const uuid = require("./helpers/uuid")
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
	// console.info(`getting db.json file`);
	console.info(req.body);
	// console.info(resp.body);
	
	// Use file system to read the file.
	fs.readFile("./db/db.json", "utf8", (error, data) => {
		error ? console.log(error) : console.log(data); /*return req.rawHeaders;*/
	// .then((data) => {
	// 	let itemsToBeReturned = data.json;
	// 	return itemsToBeReturned;
	// 	});
		// Have to send the data, else there will be no response for the user, and the page will time out.
		resp.status(200).send(data);
	});
	// readFromFile('./db/db.json').then((data) => resp.json(JSON.parse(data)));
	// // data is currently undefined.
	// console.log(data);
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("api/notes", (req, resp) => {
	console.info(`user input validated for ${req.method} request.`);
	console.info(req.rawHeaders);

	const {title, text} = req.body

	const newNote = {
		title,
		text,
		// Callback to the function within ./helpers/uuid
		review_id: uuid()
	};

	fs.writeFile("./db/db.json", newNote, (err) => {
		err ? console.log(error) : console.log("Note writen to file");
	});

	// response = {
	// 	// status: "success",
	// 	data: req.body
	// };
	// resp.json(`item ${resp.data} added.`);
	// console.log(resp.data);

	// console.log(req.body);
});

app.listen(PORT, () => {
	console.log(`app is listening at http:localhost:${PORT}`);
});