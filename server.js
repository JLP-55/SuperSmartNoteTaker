// Require express.
const express = require("express");

// Require path.
const path = require("path");

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

// Set express to listen at the PORT variable
app.listen(PORT, () => {
	console.log(`app is listening at http:localhost:${PORT}`);
});