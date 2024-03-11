const ResponseError = require("../error/response-error");
const Comment = require("../model/comments-model");
const Like = require("../model/likes-model");
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
        user: userId,
        profile: +profileId,
        comment,
        votes: {
            mbti,
            enneagram,
            zodiac,
        },
    };

    return Comment.create(data);
}

const getComments = async (profileId, filter, sort) => {
    const checkProfileExists = await getUserById(profileId);

    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');

    const filterData = {};
    filterData['profile'] = +profileId; 
    if (filter.type) filterData[`votes.${filter.type.toLowerCase()}`] = filter.val;
    const sortData = {};
    if (sort === 'recent') {
        sortData.createdAt = -1;
    } else {
        sortData.createdAt = 1;
    }
    
    return await Comment.find(filterData)
        .sort(sortData)
        .populate('user')
        .exec();
}

const likeComment = async (profileId, user, commentId) => {
    const checkProfileExists = await getUserById(profileId);

    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');
    
    const { _id: userId } = user;
    
    const data = {
        user: userId,
        comment: commentId,
    };
    
    const checkExistsComment = await Like.findOne(data);

    if (!checkExistsComment) {
        await Like.create(data);
        return 201;
    } else {
        await Like.deleteOne(data);
        return 202;
    }
}

const getLikeByCommentId = async (profileId, commentId) => {
    const checkProfileExists = await getUserById(profileId);
    
    if (!checkProfileExists) throw new ResponseError(404, 'Profile not found');

    return Like.aggregate([
        {
            $match: {
                comment: commentId,
            },
        },
        {
            $group: {
                _id: '$comment',
                count: {
                    $sum: 1,
                },
            }
        }
    ]).exec();
}

module.exports = {
    createComment,
    getComments,
    likeComment,
    getLikeByCommentId
}