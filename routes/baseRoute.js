const express = require("express")
const router = express.Router()
const utilities = require("../utilities")

/* ************************
 * Home route
 **************************/
router.get(
  "/",
  utilities.handleErrors(async (req, res) => {
    const nav = await utilities.getNav()

    res.render("index", {
      title: "Home",
      nav,
    })
  })
)

/* ************************
 * Intentional 500 error
 **************************/
router.get(
  "/error",
  utilities.handleErrors(async (req, res) => {
    throw new Error("Intentional server error")
  })
)

module.exports = router