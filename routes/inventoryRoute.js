const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

/* ***************************
 * Inventory management home
 * ***************************/
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(invController.buildInventory)
)

/* ***************************
 * Add classification view
 * ***************************/
router.get(
  "/add-classification",
  utilities.checkLogin,
  utilities.handleErrors(invController.buildAddClassification)
)

/* ***************************
 * Add classification POST
 * ***************************/
router.post(
  "/add-classification",
  utilities.checkLogin,
  utilities.handleErrors(invController.addClassification)
)

/* ***************************
 * Add inventory item view
 * ***************************/
router.get(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(invController.buildAddInventory)
)

router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router 