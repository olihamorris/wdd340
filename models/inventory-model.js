const pool = require("../database/")

/* ***************************
 * Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  )
}

/* ***************************
 * Get inventory by classification ID
 * ************************** */
async function getInventoryByClassificationId(classificationId) {
  try {
    const sql = `
      SELECT inventory.*, classification.classification_name
      FROM inventory
      JOIN classification
        ON inventory.classification_id = classification.classification_id
      WHERE inventory.classification_id = $1
    `
    const data = await pool.query(sql, [classificationId])
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error", error)
    throw error
  }
}

/* ***************************
 * Get inventory by inventory ID
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = `
      SELECT inventory.*, classification.classification_name
      FROM inventory
      JOIN classification
        ON inventory.classification_id = classification.classification_id
      WHERE inv_id = $1
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error", error)
    throw error
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById,
}