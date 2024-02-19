// Require express.
const express = require("express");
// Require path.
const path = require("path");
//  Code for notes.js file.
//  Require file system.
const fs = require("fs");
// We also need the database.json file to read from.
const db = require("./db/db.json");
// Helper method for generating unique id's
// Copied from week 11, day 2, student activity 18,
const uuid = require("./helpers/uuid");
// Create port to listen at.
const PORT = process.env.PORT || 3001;
// Create a new instance of express.
const app = express();

const api = require("./routes/index.js");

// Middleware to parse JSON form data.
app.use(express.json());
app.use(express.urlencoded ({ extended: true }));

// Middleware to serve static assets from the pubic folder
app.use(express.static("public"));

// Mount the variable "api" at the address /api
app.use("/api", api);

// * `GET *` should return the `index.html` file.
app.get("/", (req, resp) => {
	//  Send the file back to the user, __dirname is an object available in node.js
	resp.sendFile(path.join(__dirname, "/public/index.html"));
	console.info("Viewing index.html file");
});

// * `GET /notes` should return the `notes.html` file.
app.get("/notes", (req, resp) => {
	resp.sendFile(path.join(__dirname, "/public/notes.html"));
	console.info("Viewing notes.html file");
});

// // Code for the notes.js file.
// // * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// app.get("/api/notes", (req, resp) => {
// 	// Use file system to read the file.
// 	fs.readFile("./db/db.json", "utf8", (error, data) => {
// 		error ? console.log(error) : console.log(data); /*return req.rawHeaders;*/
// 		// Have to send the data, else there will be no response for the user, and the page will time out.
// 		resp.status(200).send(data);
// 	});
// });

// // * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// // You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// app.post("/api/notes", (req, resp) => {
// 	console.info(`user input validated for ${req.method} request.`);

// 	// Pull the title and text off the body of the request via object desctructuring.
// 	const {title, text, id} = req.body
// 	// Validate the existence of title and text
// 	if (title, text) {

// 		// Create an object, newNote
// 		const newNote = {
// 			title,
// 			text,
// 		// Callback to the function within ./helpers/uuid
// 			id: uuid()
// 		};

// 		// Read the db.json file.
// 		fs.readFile("./db/db.json", "utf8", (err, data) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				//  Parse each item in the array, and then push the newNote object.
// 				const parsedData = JSON.parse(data);
// 				parsedData.push(newNote);

// 				// Write all the data back to the db.json file using a stringified parsedData variable.
// 				fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) => {
// 					if (err) {
// 						console.log(err)
// 					} else {
// 						console.log("written successfully");
// 					}
// 				});
// 			};
// 			// Respond to the user.
// 			resp.status(200).json(newNote);
// 		});
// 	} else {
// 		console.info("error");
// 	};
// });

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete.
// To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// app.get("/api/notes", (req, resp) => resp.json(db));

app.delete("/api/notes/:id", (req, resp) => {
	console.info(`${req.method} note id`);

	const id = req.params.id;

	if (id) {
		const deleteId = {
			id
		};

		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) {
				console.log(err);
			} else {
				const filteredData = JSON.parse(data);
				console.log(filteredData);
			}
		});
		resp.status(200).json(deleteId);
	}

	console.log(resp.body);
	// const idNumber = req.params.id;
	// console.log(idNumber);

	// for (let i = 0; i < db.length; i++) {
	// 	if (idNumber === id) {
	// 		console.log("hello");
	// 	};
	// };

	// Reading the file.
	// fs.readFile("./db/db.json", "utf8", (error, data) => {
	// 	error ? console.log(error) : console.log(data);
	// 	resp.status(200).send(data);
	// });

	// console.info(resp.body);
	// const { id } = req.body;

	// const deleteById = {
	// 	id,
	// };

	// console.log(deleteById);
});

app.listen(PORT, () => {
	console.log(`app is listening at http:localhost:${PORT}`);
});