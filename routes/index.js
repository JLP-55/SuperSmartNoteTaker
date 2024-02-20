const router = require("express").Router();

// Import our files containing our routes
const notes = require("./notes");

// Mount the notes on /notes
router.use('/notes', notes);

// Export the router
module.exports = router;
