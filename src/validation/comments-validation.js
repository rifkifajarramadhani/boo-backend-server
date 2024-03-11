const Joi = require("joi");

const createCommentValidationSchema = Joi.object({
    userId: Joi.number().required(),
    profileId: Joi.number().required(),
    comment: Joi.string().required(),
    mbti: Joi.string().optional(),
    enneagram: Joi.string().optional(),
    zodiac: Joi.string().optional(),
});

module.exports = {
    createCommentValidationSchema,
}