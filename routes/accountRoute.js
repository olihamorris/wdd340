const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

/* ****************************************
 * Account routes
 * *************************************** */

// Login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Register view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

// Process registration
router.post(
  "/register",
  utilities.handleErrors(accountController.registerAccount)
)

// Process login
router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
)

// Account management view (protected)
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
)

router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdate)
)

// Process account info update
router.post(
  "/update",
  utilities.checkLogin,
  utilities.handleErrors(accountController.updateAccount)
)

// Process password change
router.post(
  "/update-password",
  utilities.checkLogin,
  utilities.handleErrors(accountController.updatePassword)
)

// Logout
router.get(
  "/logout",
  utilities.checkLogin,
  utilities.handleErrors(accountController.logout)
)

module.exports = router