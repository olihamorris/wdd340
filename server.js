/* ******************************************
 * server.js – Primary Express Server File
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const baseController = require("./controllers/baseController")

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
// Base (home) routes
app.use("/", require("./routes/baseRoute"))

// Inventory routes
app.use("/inventory", require("./routes/inventoryRoute"))

// Serve static files
app.use(express.static("public"))

/* ***********************
 * Routes
 *************************/
app.get("/", baseController.buildHome)

/* ***********************
 * Start Server
 *************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})