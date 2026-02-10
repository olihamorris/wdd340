const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
 * Deliver login view
 * *************************************** */
async function buildLogin(req, res) {
  const nav = await utilities.getNav()
  res.render("account/login", { title: "Login", nav, errors: null })
}

/* ****************************************
 * Deliver registration view
 * *************************************** */
async function buildRegister(req, res) {
  const nav = await utilities.getNav()
  res.render("account/register", { title: "Register", nav, errors: null })
}

/* ****************************************
 * Process registration
 * *************************************** */
async function registerAccount(req, res) {
  const nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body

  let hashedPassword
  try {
    hashedPassword = bcrypt.hashSync(account_password, 10)
  } catch (err) {
    req.flash("notice", "Registration error.")
    return res.render("account/register", {
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
  res.render("account/register", { title: "Register", nav, errors: null })
}

/* ****************************************
 * Process login
 * *************************************** */
async function accountLogin(req, res) {
  const nav = await utilities.getNav()
  const { account_email, account_password } = req.body

  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Invalid credentials.")
    return res.render("account/login", { title: "Login", nav, errors: null })
  }

  const match = await bcrypt.compare(
    account_password,
    accountData.account_password
  )

  if (!match) {
    req.flash("notice", "Invalid credentials.")
    return res.render("account/login", { title: "Login", nav, errors: null })
  }

  delete accountData.account_password

  const token = jwt.sign(
    accountData,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  )

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  })

  req.session.loggedIn = true
  req.session.accountData = accountData

  res.redirect("/account/")
}

/* ****************************************
 * Account management view
 * *************************************** */
async function buildManagement(req, res) {
  const nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null,
  })
}

/* ****************************************
 * Update account info (W05)
 * *************************************** */
async function updateAccount(req, res) {
  const nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_id,
  } = req.body

  const result = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  if (result) {
    req.session.accountData = {
      ...req.session.accountData,
      account_firstname,
      account_lastname,
      account_email,
    }
    req.flash("notice", "Account updated.")
    return res.redirect("/account/")
  }

  req.flash("notice", "Update failed.")
  res.render("account/management", { title: "Account Management", nav })
}

/* ****************************************
 * Update password (W05)
 * *************************************** */
async function updatePassword(req, res) {
  const nav = await utilities.getNav()
  const { account_password, account_id } = req.body

  const hashedPassword = bcrypt.hashSync(account_password, 10)
  const result = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )

  if (result) {
    req.flash("notice", "Password updated.")
    return res.redirect("/account/")
  }

  req.flash("notice", "Password update failed.")
  res.render("account/management", { title: "Account Management", nav })
}

/* ****************************************
 * Logout
 * *************************************** */
async function logout(req, res) {
  res.clearCookie("jwt")
  req.flash("notice", "You have been logged out.")
  req.session.destroy(() => res.redirect("/"))
}

module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  buildManagement,
  updateAccount,
  updatePassword,
  logout,
}