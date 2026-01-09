/* ****************************************** 
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* *********************** 
 * Require Statements 
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

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
app.use(express.static("public"))

/* *********************** 
 * Routes 
 *************************/
app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

/* *********************** 
 * Server Information 
 *************************/
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})