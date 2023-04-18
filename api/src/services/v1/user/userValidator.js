const Joi = require("joi");

const schema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  father_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone_no: Joi.string().required(),
  avatar: Joi.string(),
  user_role: Joi.string().valid("admin", "user").required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

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
