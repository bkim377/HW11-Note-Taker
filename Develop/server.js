var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// variables defining the notes

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
  fs.readFile("/db.json", function(err, data) {
    var savedNotes = JSON.parse(data);
    return res.json(savedNotes);
  });
});
// Route to serve JSON of the list of wait-listed reservations
app.get("/api/notes/:id", function(req, res) {
  var index = parseInt(req.params.id);
  console.log(index);
  if (isNaN(index)) {
    return res.send("Please enter a valid ID");
  }
});

// Route to add new note
app.post("/api/notes", function(req, res) {
  console.log(req.body);
  fs.readFile("/db.json", function(err, data) {
    var notesArray = JSON.parse(data);
    notesArray.push(req.body);
    console.log(notesArray);
    fs.writeFile("/db.json", JSON.stringify(notesArray), function(err) {
      res.send("Note created!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
