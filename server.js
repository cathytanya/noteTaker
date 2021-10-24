// list of libraries needed for the appliation
const { application } = require("express");
const express = require("express");
const fs = requires("fs");
const path = express("path")
// set express method to app
const app = express()
// make a port listener for heroku
const PORT = process.env.PORT || 3001