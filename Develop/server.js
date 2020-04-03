var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Route to serve index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
// Route to serve notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

// Route to serve JSON of the list of saved notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db.json"));
});

// Route to add new note - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  fs.readFile("Develop/db.json", function(err, data) {
    var notesArray = JSON.parse(data);
    notesArray.push(newNote);
    console.log(notesArray);
    res.json(newNote);
    res.send("Note created!");
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
