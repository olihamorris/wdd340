const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
 * Inventory Management View
 * ***************************/
async function buildInventory(req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Add Classification View
 * ***************************/
async function buildAddClassification(req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Add Classification Process
 * ***************************/
async function addClassification(req, res, next) {
  try {
    const nav = await utilities.getNav()
    const { classification_name } = req.body

    const result = await invModel.addClassification(classification_name)

    if (result) {
      req.flash("notice", "Classification added successfully.")
      res.redirect("/inv/")
    } else {
      res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: [{ msg: "Failed to add classification." }],
      })
    }
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Add Inventory Item View
 * ***************************/
async function buildAddInventory(req, res, next) {
  try {
    const nav = await utilities.getNav()
    const classifications = await invModel.getClassifications()

    res.render("inventory/add-inventory", {
      title: "Add Inventory Item",
      nav,
      classifications,
      errors: null,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 * Add Inventory Item Process
 * ***************************/
async function addInventory(req, res, next) {
  try {
    const nav = await utilities.getNav()
    const result = await invModel.addInventoryItem(req.body)

    if (result) {
      req.flash("notice", "Inventory item added successfully.")
      return res.redirect("/inv/")
    }

    const classifications = await invModel.getClassifications()
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory Item",
      nav,
      classifications,
      errors: [{ msg: "Failed to add inventory item." }],
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  buildInventory,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
}