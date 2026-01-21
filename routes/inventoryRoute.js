const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")

// inventory by classification
router.get("/type/:classificationId", invController.buildByClassificationId)

// inventory detail
router.get("/detail/:inv_id", invController.buildDetail)

module.exports = router