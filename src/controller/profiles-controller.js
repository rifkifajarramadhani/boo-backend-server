const profileService = require('../service/profiles-service');

const createUser = async (req, res, next) => {
    try {
        const request = req.body;

        await profileService.createUser(request);
        return res.status(201).json({
            status: 'success',
        });
    } catch (e) {
        next(e);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await profileService.getUserById(id);
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const getUserByIdRender = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await profileService.getUserById(id);
        res.render('profile_template', {
            profile: result,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByIdRender
}