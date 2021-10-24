// list of libraries needed for the appliation
const express = require("express");
const fs = require("fs");
const path = require("path");
// set express method to app
const app = express()
// make a port listener for heroku
const PORT = process.env.PORT || 3001

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// route to noteList.html
app.get("/notes",(req,res) => {
    // verify that the get was received
    res.json(`${req.method} request received /notes (notes.html)`);
    console.info(`${req.method} request received (notes.html)`);
    // set the note.html as the following page
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
// route to db.json
app.get("/api/notes",(req,res) => {
    // verify that the get was received
    res.json(`${req.method} request received /api/notes (/db/db.json)`);
    console.info(`${req.method} request received /api/notes (/db/db.json)`);

    res.sendFile(path.join(__dirname,"/db/db.json"))
})
// route to index.html
app.get("/",(req,res) => {
    // verify that the get was received
    res.json(`${req.method} request received * (index.html)`);
    console.info(`${req.method} request received * (index.html)`);
    // set the homepage as the indexedDB.html
    res.sendFile(path.join(__dirname,"/public/index.html"))
})

// save the new notes received
app.post("/api/notes",(req,res)=>{
    // verify that the POST was received
    res.json(`${req.method} request received /api/notes`);
    console.info(`${req.method} request received /api/notes`);

    let addNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteLength = (noteLength.length).toString();
    noteList.id = noteLength;
    // push update notes
    noteList.push(addNote)
    
    fs.writeFileSync("./db/db.json",JSON.stringify(noteList));
    res.json(noteList)
})

// delete notes from the app
app.delete("/api/notes/:id",(req,res)=>{
    // verify that the DELET was received
    res.json(`${req.method} request received /api/notes/:id`);
    console.info(`${req.method} request received /api/notes/:id`);
    
    let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteID = (req.params.id).toString();

    noteList = noteList.filter(selected => selected.id != noteID)

    // update notes data
    fs.writeFileSync("./db/db.json",JSON.stringify(noteList));
    res.json(noteList)
})

// listening to the port when deployed 
app.listen(PORT, () => console.log(`Listening Server on PORT ${PORT}`))