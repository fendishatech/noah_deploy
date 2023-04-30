const Joi = require("joi");

//  Input schema
const schema = Joi.object({
  first_name: Joi.string().trim().alphanum().min(3).max(30).required(),
  father_name: Joi.string().trim().alphanum().min(3).max(30).required(),
  last_name: Joi.string().trim().alphanum().min(3).max(30).required(),
  title: Joi.string().trim().min(2).max(10).required(),
  gender: Joi.string().trim().valid("male", "female").required(),
  dob: Joi.date().required(),
  martial_status: Joi.string()
    .trim()
    .valid("single", "married", "divorced", "widow")
    .required(),
  family_no: Joi.number().integer().positive().required(),
  family_males: Joi.number().positive().required(),
  family_females: Joi.number().positive().required(),
  phone_no: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  will_list: Joi.string().trim().required().required(),
  password: Joi.string().trim().min(8).required(),
  memberTypeId: Joi.number().integer().positive().required(),
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
