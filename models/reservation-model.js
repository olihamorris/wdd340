const pool = require("../database")

async function createReservation(data) {
  const sql = `
    INSERT INTO reservations
    (vehicle_id, customer_name, customer_email, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5)
  `
  return pool.query(sql, [
    data.vehicle_id,
    data.customer_name,
    data.customer_email,
    data.start_date,
    data.end_date,
  ])
}

async function getAllReservations() {
  const sql = `
    SELECT r.*, i.inv_make, i.inv_model
    FROM reservations r
    JOIN inventory i ON r.vehicle_id = i.inv_id
    ORDER BY r.created_at DESC
  `
  return pool.query(sql)
}

async function updateStatus(id, status) {
  const sql = `
    UPDATE reservations
    SET status = $1
    WHERE reservation_id = $2
  `
  return pool.query(sql, [status, id])
}

module.exports = {
  createReservation,
  getAllReservations,
  updateStatus,
}
