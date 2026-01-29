const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

/* ************************
 * Deliver login view
 ************************ */
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)



/* ************************
 * Process login
 ************************ */
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ************************
 * Deliver registration view
 ************************ */
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

/* ************************
 * Process registration
 ************************ */
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

router.get("/logout", utilities.handleErrors(accountController.logout))

module.exports = router
