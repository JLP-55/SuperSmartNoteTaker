const notes = require("express").Router();
//  Require file system.
const fs = require("fs");
// We also need the database.json file to read from.
const db = require("../db/db.json");
// Helper method for generating unique id's
// Copied from week 11, day 2, student activity 18,
const uuid = require("../helpers/uuid");

notes.get("/", (req, resp) => {
	// Use file system to read the file.
	fs.readFile("./db/db.json", "utf8", (error, data) => {
		error ? console.log(error) : console.log(data); /*return req.rawHeaders;*/
		// Have to send the data, else there will be no response for the user, and the page will time out.
		resp.status(200).send(data);
	});
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post("/", (req, resp) => {
	console.info(`user input validated for ${req.method} request.`);

	// Pull the title and text off the body of the request via object desctructuring.
	const {title, text, id} = req.body
	// Validate the existence of title and text
	if (title, text) {

		// Create an object, newNote
		const newNote = {
			title,
			text,
		// Callback to the function within ./helpers/uuid
			id: uuid()
		};

		// Read the db.json file.
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) {
				console.log(err);
			} else {
				//  Parse each item in the array, and then push the newNote object.
				const parsedData = JSON.parse(data);
				parsedData.push(newNote);

				// Write all the data back to the db.json file using a stringified parsedData variable.
				fs.writeFile("./db/db.json", JSON.stringify(parsedData, null, 4), (err) => {
					if (err) {
						console.log(err)
					} else {
						console.log("written successfully");
					}
				});
			};
			// Respond to the user.
			resp.status(200).json(newNote);
		});
	} else {
		console.info("error");
	};
});

module.exports = notes;