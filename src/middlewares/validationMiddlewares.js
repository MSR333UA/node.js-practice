const Joi = require('joi');
const {ValidationError} = require('../helpers/errors');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().min(3).max(30).required(),
      text: Joi.string().min(10).max(400).required(),
    });

    const validateError = schema.validate(req.body);
    if (validateError.error) {
      next(new ValidationError(JSON.stringify(validateError.error.details)));
    }
    next();
  },

  // patchPostValidation: (req, res, next) => {
  //   const schema = Joi.object({
  //     topic: Joi.string().alphanum().min(3).max(30).optional(),
  //     text: Joi.string().alphanum().min(10).max(400).optional(),
  //   });

  //   const validateError = schema.validate(req.body);
  //   if (validateError.error) {
  //     return res.status(400).json({ status: validateError.error.details });
  //   }
  //   next();
  // },
};
