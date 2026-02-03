const pool = require("../database/")

/* *****************************
 * Get all classifications
 * ***************************** */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name"
    const data = await pool.query(sql)

    /* ===== TEMPORARY TEST (START) ===== */
    console.log("✅ getClassifications() ran")
    console.log("Rows returned:", data.rows)
    /* ===== TEMPORARY TEST (END) ===== */

    return data.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    throw error
  }
}

/* *****************************
 * Get inventory by classification id
 * ***************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM inventory i
      JOIN classification c
        ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
      ORDER BY i.inv_make, i.inv_model
    `
    const data = await pool.query(sql, [classification_id])

    /* ===== TEMPORARY TEST (START) ===== */
    console.log("✅ getInventoryByClassificationId() ran")
    console.log("classification_id:", classification_id)
    console.log("Rows returned:", data.rows)
    /* ===== TEMPORARY TEST (END) ===== */

    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error)
    throw error
  }
}

/* *****************************
 * Get inventory by inventory id
 * ***************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM inventory i
      JOIN classification c
        ON i.classification_id = c.classification_id
      WHERE i.inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])

    /* ===== TEMPORARY TEST (START) ===== */
    console.log("✅ getInventoryById() ran")
    console.log("inv_id:", inv_id)
    console.log("Row returned:", data.rows[0])
    /* ===== TEMPORARY TEST (END) ===== */

    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error:", error)
    throw error
  }
}

/* *****************************
 * Add new inventory item
 * ***************************** */
async function addInventory(
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql = `
      INSERT INTO inventory (
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `
    const data = [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
    ]

    const result = await pool.query(sql, data)

    /* ===== TEMPORARY TEST (START) ===== */
    console.log("✅ addInventory() ran")
    console.log("Inserted row:", result.rows[0])
    /* ===== TEMPORARY TEST (END) ===== */

    return result
  } catch (error) {
    console.error("addInventory error:", error)
    throw error
  }
}

/* *****************************
 * EXPORTS
 * ***************************** */
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
  addInventory,
}