const mongoose = require('mongoose');

const Like = mongoose.model('Like', {
    user: {
        type: Number,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        ref: 'Comment',
        required: true,
    },
});

module.exports = Like;