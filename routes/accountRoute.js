// routes/accountRoute.js
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

// Account management (🔒 protected)
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
)

// Logout
router.get(
  "/logout",
  utilities.handleErrors(accountController.logout)
)

module.exports = router