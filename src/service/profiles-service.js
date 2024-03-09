const ResponseError = require("../error/response-error");
const User = require('../model/users-model');
const { createUserValidation } = require('../validation/users-validation');
const validate = require("../validation/validation");

require('../config/db');

const createUser = async (request) => {
    const {
        id: _id,
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image
    } = validate(createUserValidation, request);

    const checkExists = await checkExistingUser(_id);

    if (checkExists) throw new ResponseError(400, 'User ID already exists');

    return User.create({
        _id,
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image
    });
}

const checkExistingUser = async (userId) => {
    return User.findOne({ _id: userId });
}

const getUserById = async (userId) => {
    const result = await User.findOne({ _id: userId });
    
    if (!result) throw new ResponseError(404, 'not found');

    return result;
}

module.exports = {
    createUser,
    getUserById,
}