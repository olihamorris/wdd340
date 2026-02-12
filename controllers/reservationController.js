const reservationModel = require("../models/reservation-model")
const utilities = require("../utilities")

// Base reservations page
async function buildReserveIndex(req, res) {
  const nav = await utilities.getNav()

  res.render("reservations/reserve", {
    title: "Reserve Vehicle",
    nav,
    vehicle_id: null,
  })
}

async function buildReserveForm(req, res) {
  const vehicle_id = req.params.invId
  const nav = await utilities.getNav()

  res.render("reservations/reserve", {
    title: "Reserve Vehicle",
    nav,
    vehicle_id,
  })
}

async function createReservation(req, res) {
  const {
    vehicle_id,
    customer_name,
    customer_email,
    start_date,
    end_date,
  } = req.body

  if (!vehicle_id || !customer_name || !customer_email || !start_date || !end_date) {
    req.flash("notice", "All fields are required.")
    return res.redirect("back")
  }

  await reservationModel.createReservation(req.body)
  req.flash("notice", "Reservation submitted successfully.")
  res.redirect("/")
}

async function buildManageReservations(req, res) {
  const data = await reservationModel.getAllReservations()
  const nav = await utilities.getNav()

  res.render("reservations/manage", {
    title: "Manage Reservations",
    nav,
    reservations: data.rows,
  })
}

async function approveReservation(req, res) {
  await reservationModel.updateStatus(req.params.id, "Approved")
  res.redirect("/reservations/manage")
}

async function cancelReservation(req, res) {
  await reservationModel.updateStatus(req.params.id, "Cancelled")
  res.redirect("/reservations/manage")
}

module.exports = {
  buildReserveIndex,
  buildReserveForm,
  createReservation,
  buildManageReservations,
  approveReservation,
  cancelReservation,
}