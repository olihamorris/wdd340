const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

/* ******** Inventory Rules ******** */
validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .notEmpty()
      .withMessage("Make is required."),
    body("inv_model")
      .trim()
      .notEmpty()
      .withMessage("Model is required."),
  ]
}

/* ******** Check Inventory Data ******** */
validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      errors: errors.array(),   // ✅ THIS IS THE FIX
    })
  }
  next()
}

module.exports = validate