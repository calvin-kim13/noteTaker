const router = require("express").Router();
const fs = require("fs");
const db = require("../../db/db.json");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  res.json(db);
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, noteId: uuidv1() };
    db.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(db));
    console.log(newNote);
    res.json(db);
  } else {
    res.status(500).json("Error in posting note");
  }
});

router.delete("/notes/:id", (req, res) => {});

module.exports = router;
