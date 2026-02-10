const pool = require("../database")

/* ***************************
 * Build the navigation bar
 * ***************************/
async function getNav() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name"
    const data = await pool.query(sql)

    let nav = "<ul>"
    nav += '<li><a href="/" title="Home">Home</a></li>'

    data.rows.forEach((row) => {
      nav += `<li>
        <a href="/inv/type/${row.classification_id}" title="View ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`
    })

    nav += "</ul>"
    return nav
  } catch (error) {
    console.error("getNav error:", error)
    return ""
  }
}

/* ***************************
 * Build classification grid
 * ***************************/
async function buildClassificationGrid(data) {
  let grid = ""

  if (data.length > 0) {
    grid = '<ul id="inv-display">'
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
            <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
          </div>
        </li>
      `
    })
    grid += "</ul>"
  } else {
    grid = "<p class='notice'>Sorry, no matching vehicles found.</p>"
  }

  return grid
}

/* ***************************
 * Build vehicle detail HTML
 * ***************************/
async function buildVehicleDetailHTML(vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Miles:</strong> ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>
      </div>
    </section>
  `
}

/* ***************************
 * Check Login Middleware
 * ***************************/
function checkLogin(req, res, next) {
  if (req.session && req.session.loggedIn) {
    return next()
  }
  req.flash("notice", "Please log in.")
  return res.redirect("/account/login")
}

/* ***************************
 * Error handler wrapper
 * ***************************/
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* ***************************
 * Exports
 * ***************************/
module.exports = {
  getNav,
  buildClassificationGrid,
  buildVehicleDetailHTML,
  checkLogin,
  handleErrors,
}