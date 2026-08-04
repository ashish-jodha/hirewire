const Joi = require('joi');

module.exports.applicationValidation = Joi.object({
    company: Joi.string()
        .trim()
        .required(),
    position: Joi.string()
        .trim()
        .required(),
    status: Joi.string()
        .valid("Applied", "Interviewing", "Offered", "Rejected")
        .required()
})