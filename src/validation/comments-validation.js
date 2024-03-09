const Joi = require("joi");

const createCommentValidationSchema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().required(),
    comment: Joi.string().required(),
    mbti: Joi.string().required(),
    enneagram: Joi.string().required(),
    variant: Joi.string().required(),
});

module.exports = {
    createCommentValidationSchema
}