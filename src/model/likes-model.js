const mongoose = require('mongoose');

const Like = mongoose.model('Like', {
    userId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true,
    },
});

module.exports = Like;