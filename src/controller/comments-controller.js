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

        const filter = {};
        if (req.query.filter) {
            const filterType = req.query.filter.split('-')[0];
            const filterVal = req.query.filter.split('-')[1];
            filter.type = filterType;
            filter.val = filterVal;
        }
        let sort = {};
        if (req.query.sort) {
            sort = req.query.sort;
        }
        const result = await commentService.getComments(profileId, filter, sort);
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
        const user = req.user;
        const commentId = req.params.commentId;

        const result = await commentService.likeComment(profileId, user, commentId);

        if (result === 201) {
            return res.status(201).json({
                status: 'success'
            });
        }
        
        return res.status(202).json({
            status: 'success'
        });
    } catch (e) {
        next(e);
    }
}

const getLikeByCommentId = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const commentId = req.params.commentId;

        const result = await commentService.getLikeByCommentId(profileId, commentId);
        return res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createComment,
    getComments,
    likeComment,
    getLikeByCommentId
}