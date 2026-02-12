

/* ******************************************
 * Require Statements
 * *****************************************/
const express = require("express")
require("dotenv").config()
const app = express()
const expressLayouts = require("express-ejs-layouts")
const session = require("express-session")
const bodyParser = require("body-parser")
const flash = require("connect-flash")

/* ******************************************
 * Utilities & Routes
 * *****************************************/
const utilities = require("./utilities")
const accountRoute = require("./routes/accountRoute")
const inventoryRoute = require("./routes/inventoryRoute")
const reservationRoute = require("./routes/reservationRoute")

/* ******************************************
 * Middleware
 * *****************************************/

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static files
app.use(express.static("public"))

// Session middleware
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// Flash middleware
app.use(flash())

// Make session + flash available to all views
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn
  res.locals.accountData = req.session.accountData
  res.locals.messages = req.flash()
  next()
})

/* ******************************************
 * View Engine
 * *****************************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout")
console.log("Layout set to:", app.get("layout"))
/* ******************************************
 * Routes
 * *****************************************/

// Home route
app.get(
  "/",
  utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()
    res.render("index", {
      title: "Home",
      nav,
    })
  })
)

// Account routes
app.use("/account", accountRoute)

// Inventory routes
app.use("/inv", inventoryRoute)

// Reservation routes
app.use("/reservations", reservationRoute)

/* ******************************************
 * 404 Handler
 * *****************************************/
app.use(async (req, res) => {
  const nav = await utilities.getNav()
  res.status(404).render("errors/404", {
    title: "404 Error",
    nav,
  })
})

/* ******************************************
 * 500 Handler
 * *****************************************/
app.use(async (err, req, res, next) => {
  console.error(err.stack)
  const nav = await utilities.getNav()
  res.status(500).render("errors/500", {
    title: "Server Error",
    nav,
    message: err.message,
  })
})

/* ******************************************
 * Server
 * *****************************************/
const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})