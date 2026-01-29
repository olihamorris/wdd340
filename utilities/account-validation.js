const { body, validationResult } = require("express-validator")
const utilities = require(".")
const accountModel = require("../models/account-model")

const validate = {}

/* ************************
 * Registration rules
 ************************ */
validate.registationRules = () => {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("First name is required."),

    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name is required."),

    body("account_email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required.")
      .custom(async (account_email) => {
        const emailExists = await accountModel.checkExistingEmail(account_email)
        if (emailExists) {
          throw new Error(
            "Email exists. Please log in or use a different email."
          )
        }
      }),

    body("account_password")
      .trim()
      .isStrongPassword()
      .withMessage("Password does not meet requirements."),
  ]
}

/* ************************
 * Check registration data
 ************************ */
validate.checkRegData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      errors,
      title: "Register",
      nav,
    })
    return
  }
  next()
}

/* ************************
 * Login rules
 ************************ */
validate.loginRules = () => {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ]
}

/* ************************
 * Check login data
 ************************ */
validate.checkLoginData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
    })
    return
  }
  next()
}

module.exports = validate