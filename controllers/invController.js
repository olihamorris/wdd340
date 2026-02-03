const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ****************************************
 * CONTROLLER OBJECT (REQUIRED)
 **************************************** */
const invCont = {}

/* ***************************
 * Inventory Management View
 * *************************** */
invCont.buildManagement = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash(),
  })
}

/* ***************************
 * Add Classification View
 * *************************** */
invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    messages: req.flash(),
  })
}

/* ***************************
 * Process Add Classification
 * *************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const nav = await utilities.getNav()

  try {
    await invModel.addClassification(classification_name)
    req.flash("notice", "Classification added successfully.")
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash(),
    })
  } catch (error) {
    console.error(error)
    req.flash("notice", "Failed to add classification.")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      messages: req.flash(),
    })
  }
}

/* ***************************
 * Add Inventory View
 * *************************** */
invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
    messages: req.flash(),
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "/images/vehicles/no-image.png",
    inv_thumbnail: "/images/vehicles/no-image-tn.png",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
    classification_id: "",
  })
}

/* ***************************
 * Process Add Inventory
 * *************************** */
invCont.addInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(
    req.body.classification_id
  )

  try {
    await invModel.addInventory(
      req.body.inv_make,
      req.body.inv_model,
      req.body.inv_description,
      req.body.inv_image,
      req.body.inv_thumbnail,
      req.body.inv_price,
      req.body.inv_year,
      req.body.inv_miles,
      req.body.inv_color,
      req.body.classification_id
    )

    req.flash("notice", "Inventory item added successfully.")
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash(),
    })
  } catch (error) {
    console.error(error)
    req.flash("notice", "Failed to add inventory item.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: null,
      messages: req.flash(),
      ...req.body,
    })
  }
}

/* ***************************
 * Inventory by Classification
 * *************************** */
invCont.buildByClassificationId = async function (req, res) {
  const classificationId = req.params.classificationId
  const vehicles = await invModel.getInventoryByClassificationId(classificationId)
  const nav = await utilities.getNav()

  if (!vehicles || vehicles.length === 0) {
    return res.status(404).render("errors/404", {
      title: "No vehicles found",
      nav,
      message: "No vehicles in this classification.",
    })
  }

  res.render("inventory/classification", {
    title: vehicles[0].classification_name,
    nav,
    grid: utilities.buildClassificationGrid(vehicles),
  })
}

/* ***************************
 * Vehicle Detail View
 * *************************** */
invCont.buildDetail = async function (req, res) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicle,
    utilities,
  })
}

/* ****************************************
 * EXPORT CONTROLLER
 **************************************** */
module.exports = invCont