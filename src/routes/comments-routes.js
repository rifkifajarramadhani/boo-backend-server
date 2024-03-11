'use strict';

const express = require('express');
const commentController = require('../controller/comments-controller');
const authMiddleware = require('../middleware/auth-middleware');
const errorMiddleware = require('../middleware/error-middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/profile/:profileId/comments', commentController.createComment);
router.get('/profile/:profileId/comments', commentController.getComments);
router.post('/profile/:profileId/comments/:commentId', commentController.likeComment);
router.get('/profile/:profileId/comments/:commentId', commentController.getLikeByCommentId);

router.use(errorMiddleware);

module.exports = router;
