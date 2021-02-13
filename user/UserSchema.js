const Joi = require('joi');

const newUserSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(8).max(15).required()
})

module.exports = {
    newUserSchema
}