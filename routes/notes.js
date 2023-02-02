const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../public/assets/js/fsUtils");

// REFERENCED WEEK #11 MINIPROJECT 1/29/23
// GET Route for retrieving all notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// REFERENCED WEEK #11 MINIPROJECT 1/29/23
// POST Route for a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note was successfully created");
  } else {
    res.error("Error in adding note");
  }
});

// REFERENCED WEEK #11 MINIPROJECT 1/29/23
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile("./db/db.json", result);
      res.json(`Item ${noteId} has been deleted`);
    });
});

module.exports = notes;
