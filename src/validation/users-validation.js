const Joi = require("joi");

const createUserValidation = Joi.object({
    _id: Joi.number().required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200).required(),
    mbti: Joi.string().max(4).required(),
    enneagram: Joi.string().max(3).required(),
    variant: Joi.string().max(50).required(),
    tritype: Joi.number().required(),
    socionics: Joi.string().max(20).required(),
    sloan: Joi.string().max(20).required(),
    psyche: Joi.string().max(20).required(),
    image: Joi.string().max(100).required(),
});

module.exports = {
    createUserValidation
}