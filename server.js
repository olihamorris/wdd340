/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()

/* ***********************
 * Middleware
 *************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

/* ***********************
 * Routes
 *************************/
app.use("/account", require("./routes/accountRoute"))
app.use("/inv", require("./routes/inventoryRoute")) 
app.use("/", require("./routes/baseRoute"))

/* ***********************
 * Server
 *************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})