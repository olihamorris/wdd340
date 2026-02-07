const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
 * NAVIGATION BUILDER
 **************************************** */
async function getNav(req = null) {
  const classifications = await invModel.getClassifications()

  let nav = '<ul class="nav-list">'
  nav += '<li><a href="/">Home</a></li>'

  if (Array.isArray(classifications)) {
    classifications.forEach(row => {
      nav += `
        <li>
          <a href="/inv/type/${row.classification_id}">
            ${row.classification_name}
          </a>
        </li>`
    })
  }

  if (req?.session?.loggedIn) {
    nav += '<li><a href="/account/">Account</a></li>'
    nav += '<li><a href="/account/logout">Logout</a></li>'
  } else {
    nav += '<li><a href="/account/login">Login</a></li>'
  }

  nav += "</ul>"
  return nav
}

/* ****************************************
 * JWT CHECK
 **************************************** */
function checkJWTToken(req, res, next) {
  const token = req.cookies.jwt
  if (!token) return next()

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("jwt")
      return next()
    }
    req.session.loggedIn = true
    req.session.accountData = decoded
    next()
  })
}

/* ****************************************
 * LOGIN REQUIRED
 **************************************** */
function checkLogin(req, res, next) {
  if (req.session.loggedIn) return next()
  req.flash("notice", "Please log in.")
  res.redirect("/account/login")
}

/* ****************************************
 * CLASSIFICATION GRID
 **************************************** */
function buildClassificationGrid(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return "<p class='notice'>Sorry, no vehicles found.</p>"
  }

  let grid = '<ul class="inv-display">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${Number(vehicle.inv_price).toLocaleString()}</span>
        </div>
      </li>`
  })

  grid += "</ul>"
  return grid
}

/* ****************************************
 * VEHICLE DETAIL BUILDER
 **************************************** */
function buildVehicleDetail(vehicle) {
  if (!vehicle) {
    return "<p class='notice'>Vehicle not found.</p>"
  }

  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> $${Number(vehicle.inv_price).toLocaleString()}</p>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Miles:</strong> ${Number(vehicle.inv_miles).toLocaleString()}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </section>`
}

/* ****************************************
 * ASYNC ERROR HANDLER
 **************************************** */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = {
  getNav,
  checkJWTToken,
  checkLogin,
  buildClassificationGrid,
  buildVehicleDetail,
  handleErrors,
}