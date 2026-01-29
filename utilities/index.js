const invModel = require("../models/inventory-model")

const utilities = {}

/* *****************************
 * Error handler wrapper
 * ***************************** */
utilities.handleErrors = fn => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* *****************************
 * Build navigation
 * ***************************** */
utilities.getNav = async function () {
  const data = await invModel.getClassifications() // <-- already rows

  let nav = "<ul>"
  nav += '<li><a href="/" title="Home">Home</a></li>'

  data.forEach(row => {
    nav += `
      <li>
        <a href="/inv/type/${row.classification_id}">
          ${row.classification_name}
        </a>
      </li>`
  })

  nav += "</ul>"
  return nav
}

/* *****************************
 * Build classification grid
 * ***************************** */
utilities.buildClassificationGrid = function (data) {
  let grid = '<ul class="inv-display">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" 
               alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`
  })

  grid += "</ul>"
  return grid
}

/* *****************************
 * Build vehicle detail view
 * ***************************** */
utilities.buildVehicleDetail = function (vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" 
           alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
        <p><strong>Miles:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>`
}

/* *****************************
 * Build classification select list
 * ***************************** */
utilities.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications()

  let list = '<select name="classification_id" required>'
  list += "<option value=''>Choose a classification</option>"

  data.forEach(row => {
    list += `<option value="${row.classification_id}" ${
      classification_id == row.classification_id ? "selected" : ""
    }>${row.classification_name}</option>`
  })

  list += "</select>"
  return list
}

module.exports = utilities