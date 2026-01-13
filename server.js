/* ******************************************
 * server.js – Primary Express Server File
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

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
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// Add additional routes here if needed
// e.g., app.get("/about", (req, res) => { res.render("about", { title: "About" }) })

/* ***********************
 * Start Server
 *************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})