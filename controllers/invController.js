const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * *************************** */
invCont.buildByClassificationId = async function (req, res) {
  const classificationId = req.params.classificationId
  const vehicles = await invModel.getInventoryByClassificationId(classificationId)
  const nav = await utilities.getNav()

  if (!vehicles || vehicles.length === 0) {
    return res.render("inventory/classification", {
      title: "No Vehicles Found",
      nav,
      grid: "<p>No vehicles found.</p>",
    })
  }

  res.render("inventory/classification", {
    title: vehicles[0].classification_name,
    nav,
    grid: utilities.buildClassificationGrid(vehicles),
  })
}

/* ***************************
 * Build vehicle detail view
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

module.exports = invCont