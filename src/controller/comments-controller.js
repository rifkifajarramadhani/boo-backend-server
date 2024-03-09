const commentService = require('../service/comments-service');

const createComment = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const user = req.user;
        const request = req.body;

        await commentService.createComment(profileId, user, request);
        return res.status(201).json({
            status: 'success',
        });
    } catch (e) {
        next(e);
    }
}

const getComments = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;

        const result = await commentService.getComments(profileId);
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const likeComment = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const commentId = req.params.commentId;

        const result = await commentService.likeComment(profileId, commentId)
    } catch (e) {

    }
}

module.exports = {
    createComment,
    getComments,
    likeComment
}