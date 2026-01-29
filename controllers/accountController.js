const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")

/* ****************************************
 * Deliver login view
 * *************************************** */
async function buildLogin(req, res) {
  const nav = await utilities.getNav()

  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
    messages: req.flash(),
  })
}

/* ****************************************
 * Deliver registration view
 * *************************************** */
async function buildRegister(req, res) {
  const nav = await utilities.getNav()

  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
    messages: req.flash(),
  })
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
  } catch (error) {
    req.flash("notice", "Sorry, there was an error processing the registration.")
    return res.status(500).render("account/register", {
      title: "Register",
      nav,
      errors: null,
      messages: req.flash(),
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you're registered ${account_firstname}. Please log in.`
    )

    return res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      messages: req.flash(),
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    return res.status(501).render("account/register", {
      title: "Register",
      nav,
      errors: null,
      messages: req.flash(),
    })
  }
}

/* ****************************************
 * Process login (temporary)
 * *************************************** */
async function accountLogin(req, res) {
  res.status(200).send("login process")
}

async function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/")
    }
    res.clearCookie("connect.sid")
    res.redirect("/")
  })
}

module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  accountLogin,
  logout,
}