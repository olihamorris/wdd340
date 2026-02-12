const express = require("express")
const router = express.Router()
const reservationController = require("../controllers/reservationController")
const utilities = require("../utilities")

// ✅ Added base reservations route
router.get(
  "/",
  utilities.handleErrors(reservationController.buildReserveIndex)
)

router.get(
  "/reserve/:invId",
  utilities.handleErrors(reservationController.buildReserveForm)
)

router.post(
  "/reserve",
  utilities.handleErrors(reservationController.createReservation)
)

router.get(
  "/manage",
  utilities.checkLogin,
  utilities.handleErrors(reservationController.buildManageReservations)
)

router.get(
  "/approve/:id",
  utilities.checkLogin,
  utilities.handleErrors(reservationController.approveReservation)
)

router.get(
  "/cancel/:id",
  utilities.checkLogin,
  utilities.handleErrors(reservationController.cancelReservation)
)

module.exports = router