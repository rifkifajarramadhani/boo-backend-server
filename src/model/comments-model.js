const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const commentSchema = new Schema({
    user: {
        type: Number,
        ref: 'User',
        required: true,
    },
    profile: {
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
        zodiac: String,
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;