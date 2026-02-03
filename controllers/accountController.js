const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
 * Deliver login view
 * *************************************** */
async function buildLogin(req, res) {
  const nav = await utilities.getNav(req)

  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Deliver registration view
 * *************************************** */
async function buildRegister(req, res) {
  const nav = await utilities.getNav(req)

  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Process registration
 * *************************************** */
async function registerAccount(req, res) {
  const nav = await utilities.getNav(req)

  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body

  let hashedPassword
  try {
    hashedPassword = bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", "Registration error.")
    return res.status(500).render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash("notice", "Registration successful. Please log in.")
    return res.redirect("/account/login")
  }

  req.flash("notice", "Registration failed.")
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Process login
 * *************************************** */
async function accountLogin(req, res) {
  const nav = await utilities.getNav(req)
  const { account_email, account_password } = req.body

  const accountData = await accountModel.getAccountByEmail(account_email)

  if (!accountData) {
    req.flash("notice", "Invalid credentials.")
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  const passwordMatch = await bcrypt.compare(
    account_password,
    accountData.account_password
  )

  if (!passwordMatch) {
    req.flash("notice", "Invalid credentials.")
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  }

  // Remove password before token
  delete accountData.account_password

  // Create JWT
  const accessToken = jwt.sign(
    accountData,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  )

  // Store JWT in cookie
  res.cookie("jwt", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  })

  // Store login state in session
  req.session.loggedIn = true
  req.session.accountData = accountData

  res.redirect("/account/")
}

/* ****************************************
 * Account management view
 * *************************************** */
async function buildManagement(req, res) {
  const nav = await utilities.getNav(req)

  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Logout (FIXED – no crash)
 * *************************************** */
async function logout(req, res) {
  // Remove JWT cookie
  res.clearCookie("jwt")

  // Flash must happen BEFORE session destroy
  req.flash("notice", "You have been logged out.")

  // Destroy session safely
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err)
    }
    res.redirect("/")
  })
}

module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  buildManagement,
  logout,
}