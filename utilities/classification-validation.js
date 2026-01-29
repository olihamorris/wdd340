const { body, validationResult } = require("express-validator")
const utilities = require(".")

const validate = {}

/* ***************************
 * Classification validation rules
 * *************************** */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .notEmpty()
      .withMessage("Classification name is required.")
      .isAlphanumeric()
      .withMessage("Classification name must contain only letters and numbers."),
  ]
}

/* ***************************
 * Check classification data
 * *************************** */
validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()

    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
      messages: req.flash(),
    })
  }
  next()
}

module.exports = validate