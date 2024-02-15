// Require express.
const express = require("express");
// Require path.
const path = require("path");
// We also need the database.json file to read from.
const db = require("./db/db.json")
// Create port to listen at.
const port = 3001;
// Create a new instance of express.
const app = express();

// Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
	response.sendFile(path.join(__dirname, "/public/index.html"));
	console.info("something is happening");
});

app.get("/notes", (request, response) => {
	response.sendFile(path.join(__dirname, "/public/notes.html"))
	// return response.json(db);
})

app.post("/notes", (request, response) => {
	console.info(`user input validated.`);


	response = {
		// status: "success",
		data: request.body
	};
	response.json(response.data);
	console.log(response.json);

	console.log(request.body);
})

app.listen(port, () => {
	console.log(`app is listening at http:localhost:${port}`);
});