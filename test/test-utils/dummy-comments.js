const Comment = require("../../src/model/comments-model");
const Like = require("../../src/model/likes-model");
const { users } = require("./dummy-users");

const comments = [
    {
        user: users[1]._id,
        profile: users[0]._id,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie efficitur facilisis 1.',
        votes: {
            mbti: 'INFJ',
            enneagram: '6w5',
            zodiac: 'Aquarius',
        }
    },
    {
        user: users[2]._id,
        profile: users[0]._id,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie efficitur facilisis 2.',
        votes: {
            mbti: 'ISTP',
        }
    },
    {
        user: users[3]._id,
        profile: users[0]._id,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie efficitur facilisis 3.',
        votes: {
            mbti: 'ISTP',
            zodiac: 'Aquarius',
        }
    },
];

const createTestComents = async () => {
    await Comment.create(comments);
}

const getTestComents = async () => {
    return Comment.find();
}

const deleteTestComments = async () => {
    await Comment.deleteMany({});
}

const getLikes = async () => {
    return Like.find();
}

module.exports = {
    comments,
    createTestComents,
    getTestComents,
    deleteTestComments,
    getLikes
};