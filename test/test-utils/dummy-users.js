const User = require("../../src/model/users-model");

const users = [
    {
        "_id": 1,
        "name": "A Martinez",
        "description": "Adolph Larrue Martinez III.",
        "mbti": "ISFJ",
        "enneagram": "5w6",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
    },
    {
        "_id": 2,
        "name": "R Araujo",
        "description": "Ronald Araujo.",
        "mbti": "ENTJ",
        "enneagram": "9w8",
        "variant": "sp/so",
        "tritype": 725,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
    },
    {
        "_id": 3,
        "name": "CR7",
        "description": "Cristiano Ronaldo.",
        "mbti": "INTP",
        "enneagram": "1w2",
        "variant": "sp/so",
        "tritype": 111,
        "socionics": "SEE",
        "sloan": "RCOEN",
        "psyche": "FEVL",
        "image": "https://soulverse.boo.world/images/1.png"
    },
];

const createTestUser = async () => {
    await User.create(users[0], users[1], users[2]);
}

const getTestUser = async() => {
    return User.findOne({ _id: users[0]._id });
}

const deleteTestUser = async () => {
    await User.deleteMany({});
}

module.exports = {
    users,
    createTestUser,
    getTestUser,
    deleteTestUser
};