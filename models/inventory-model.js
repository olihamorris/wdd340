const pool = require("../database")

/* ***************************
 * Get all classifications
 * ***************************/
async function getClassifications() {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM classification
      ORDER BY classification_name
    `
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    throw error
  }
}

/* ***************************
 * Add new classification
 * ***************************/
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    const data = await pool.query(sql, [classification_name])
    return data.rows[0]
  } catch (error) {
    console.error("addClassification error:", error)
    return null
  }
}

/* ***************************
 * Add inventory item
 * ***************************/
async function addInventoryItem(inv) {
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
    const data = await pool.query(sql, [
      inv.inv_make,
      inv.inv_model,
      inv.inv_description,
      inv.inv_image,
      inv.inv_thumbnail,
      inv.inv_price,
      inv.inv_year,
      inv.inv_miles,
      inv.inv_color,
      inv.classification_id,
    ])
    return data.rows[0]
  } catch (error) {
    console.error("addInventoryItem error:", error)
    return null
  }
}

module.exports = {
  getClassifications,
  addClassification,
  addInventoryItem,
}