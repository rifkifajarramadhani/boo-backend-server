const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
    userId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profileId: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    votes: {
        mbti: String,
        enneagram: String,
        variant: String,
    }
});

module.exports = Comment;