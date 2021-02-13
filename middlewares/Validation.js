const { func } = require('joi');
const Joi = require('joi');

const validateRequest = (schema) => async function(req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.send({ code: 1, error: error.details.length ? error.details[0].message : "input error" })
    }

    return next();
};

module.exports = {
    validateRequest
}