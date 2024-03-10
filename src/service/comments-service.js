const ResponseError = require("../error/response-error");
const Comment = require("../model/comments-model");
const { createCommentValidationSchema } = require("../validation/comments-validation");
const validate = require("../validation/validation");
const { getUserById } = require("./profiles-service");

const createComment = async (profileId, user, request) => {
    const checkProfileExists = await getUserById(profileId);

    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');

    const { _id: userId } = user;
    const {
        comment,
    } = request;
    const mbti = request.votes.mbti;
    const enneagram = request.votes.enneagram;
    const zodiac = request.votes.zodiac;

    validate(createCommentValidationSchema, {
        userId,
        profileId,
        comment,
        mbti,
        enneagram,
        zodiac,
    });

    const data = {
        userId,
        profileId,
        comment,
        votes: {
            mbti,
            enneagram,
            zodiac,
        },
    };

    return Comment.create(data);
}

const getComments = async (profileId) => {
    const checkProfileExists = await getUserById(profileId);

    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');
    
    return Comment.find({ profileId });
}

const likeComment = async (profileId, request) => {
    const checkProfileExists = await getUserById(profileId);

    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');

    
}

module.exports = {
    createComment,
    getComments
}