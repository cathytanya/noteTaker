// list of libraries needed for the appliation
const express = require("express");
const fs = require("fs");
const path = require("path")
// set express method to app
const app = express()
// make a port listener for heroku
const PORT = process.env.PORT || 3001

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// route to index.html
app.get("/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
// route to noteList.html
app.get("/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"/public/notes.html"))
})
// route to db.json
app.get("/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"/db/db.json"))
})