const router = require("express").Router();

// Import our files containing our routes
const notes = require("./notes");

// router is a mini application/server.
// Mount the notes on /notes
router.use('/notes', notes);

module.exports = router;
