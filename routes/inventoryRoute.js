const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// inventory management view
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// add classification view
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// process add classification (NO validation here)
router.post(
  "/add-classification",
  utilities.handleErrors(invController.addClassification)
)

// add inventory view (TASK 3)
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// process add inventory (WITH validation)
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// inventory by classification
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// inventory detail 
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildDetail)
)

module.exports = router