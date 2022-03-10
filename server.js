const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
let app = express();
const { v1: uuidv1 } = require("uuid");

let PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

//HOME PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//NOTES PAGE
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//NOTES PAGE WITH LISTED NOTES
app.get("/api/notes", (req, res) => {
  return res.json(db);
});

//CREATE NOTE
app.post("/api/notes", (req, res) => {
  let note = req.body;
  note.id = uuidv1();
  db.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

//DEFAULT
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
