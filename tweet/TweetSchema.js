const Joi = require('joi');

const newTweetSchema = Joi.object().keys({
    title: Joi.string().min(3).max(15).required(),
    desc: Joi.string().min(5).max(100).required()
})

const updateTweetSchema = Joi.object().keys({
    _id: Joi.string(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    post_id: Joi.string().required()
})

const deleteTweetSchema = Joi.object().keys({
    post_id: Joi.string().required()
})



module.exports = {
    newTweetSchema,
    updateTweetSchema,
    deleteTweetSchema
}