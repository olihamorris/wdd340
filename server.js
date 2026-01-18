/* ******************************************
 * server.js – Primary Express Server File
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()
[{
	"resource": "/c:/Users/HP/Documents/wdd340/server.js",
	"owner": "typescript",
	"code": "1005",
	"severity": 8,
	"message": "',' expected.",
	"source": "ts",
	"startLineNumber": 16,
	"startColumn": 1,
	"endLineNumber": 16,
	"endColumn": 6,
	"modelVersionId": 3,
	"origin": "extHost1"
}]

const baseController = require('./controllers/baseController');

/* ***********************
 * Initialize App
 *************************/
const app = express()

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

/* ***********************
 * Middleware
 *************************/
// Serve static files from "public" folder
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
app.get("/", baseController.buildHome) 

// Add additional routes here if needed
// e.g., app.get("/about", (req, res) => { res.render("about", { title: "About" }) })

/* ***********************
 * Start Server
 *************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})