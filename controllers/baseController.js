const utilities = require("../utilities")

async function buildHome(req, res, next) {
  let nav = await utilities.getNav()
  res.render("index", {
    title: "Home",
    nav,
  })
}

module.exports = { buildHome }