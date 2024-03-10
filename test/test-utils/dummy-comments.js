const { users } = require("./dummy-users");

const comments = [
    {
        userId: users[1]._id,
        profileId: users[0]._id,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie efficitur facilisis.',
        votes: {
            mbti: 'INFJ',
            enneagram: '6w5',
            zodiac: 'Aquarius',
        }
    },
    {
        userId: users[2]._id,
        profileId: users[0]._id,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis molestie efficitur facilisis.',
        votes: {
            mbti: 'ISTP',
        }
    },
];

module.exports = {
    comments
};