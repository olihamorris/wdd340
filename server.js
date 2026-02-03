const express = require("express")
const app = express()
require("dotenv").config()

const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
const utilities = require("./utilities")
const accountRoute = require("./routes/accountRoute")
const inventoryRoute = require("./routes/inventoryRoute")

/* ******** VIEW ENGINE ******** */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* ******** EXPRES LAYOUTS ******** */
app.use(expressLayouts)
app.set("layout", "layouts/layout")

/* ******** MIDDLEWARE ******** */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

/* ******** SESSION ******** */
app.use(
  session({
    name: "cse340-session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
)

/* ******** FLASH ******** */
app.use(flash())

/* ******** JWT CHECK (MUST COME BEFORE ROUTES) ******** */
app.use(utilities.checkJWTToken)

/* ******** GLOBAL LOCALS ******** */
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  res.locals.loggedIn = req.session.loggedIn || false
  res.locals.accountData = req.session.accountData || null
  next()
})

/* ******** ROUTES ******** */
app.use("/account", accountRoute)
app.use("/inv", inventoryRoute)

app.get("/", async (req, res, next) => {
  try {
    const nav = await utilities.getNav(req) // ✅ PASS req
    res.render("index", {
      title: "Home",
      nav,
    })
  } catch (err) {
    next(err)
  }
})

app.get("/error", (req, res, next) => {
  next(new Error("Intentional error for testing"))
})

/* ******** ERROR HANDLER ******** */
app.use((err, req, res, next) => {
  console.error("Global error handler:", err)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong.",
  })
})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})