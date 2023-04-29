const Joi = require("joi");

//  Input schema
const schema = Joi.object({
  first_name: Joi.string().trim().alphanum().min(3).max(30).required(),
  father_name: Joi.string().trim().alphanum().min(3).max(30).required(),
  phone_no: Joi.string().trim().required(),
});

// Input schema validator
const inputValidation = (req, res, next) => {
  try {
    const { body } = req;

    Joi.assert(body, schema);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      type: error.name,
      detail: error.details[0].type,
      message: error.details[0].message,
    });
  }
};

module.exports = {
  inputValidation,
};
