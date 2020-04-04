var express = require("express");
var path = require("path");
var fs = require("fs");
const { v4: uuidv4 } = require('uuid'); // installs a unique id for each new note - used for delete route

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Route to serve index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// Route to serve notes.html
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Route to serve JSON of the list of saved notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db.json"));
});

// Route to add new note - takes in JSON input
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  newNote.id = uuidv4();
  fs.readFile("db.json", "utf8", function(err, data){
    var notesArray = JSON.parse(data);
    notesArray.push(newNote);
    var updatedArray = JSON.stringify(notesArray);
    fs.writeFile("db.json", updatedArray, function(err) {
        if (err) throw err;
      });
        res.send("Note created!");
  })
});

// Route to delete specific notes - uses the filter function on the entire db.json file and then reprints it
// with the note deleted
app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params.id);
    fs.readFile("db.json", "utf8", function(err, data){
    var notesArray = JSON.parse(data);
    var newArray = notesArray.filter(note => {
        console.log(note.id !== req.params.id);
        return note.id !== req.params.id;
    }); 
    var updatedArray = JSON.stringify(newArray);
    fs.writeFile("db.json", updatedArray, function(err) {
        if (err) throw err;
      });
        res.send("Note created!");
    })
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
