const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const invValidate = require("../utilities/inventory-validation")

/* ****************************************
 * Inventory routes
 * *************************************** */

// Inventory management view
router.get("/", invController.buildManagement)

// Add classification view
router.get("/add-classification", invController.buildAddClassification)

// Process add classification
router.post("/add-classification", invController.addClassification)

// Add inventory view
router.get("/add-inventory", invController.buildAddInventory)

// Process add inventory
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
)

// Inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

// Inventory detail
router.get("/detail/:inv_id", invController.buildDetail)

module.exports = router