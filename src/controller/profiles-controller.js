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
        const profiles = [
            {
                "id": 1,
                "name": "A Martinez",
                "description": "Adolph Larrue Martinez III.",
                "mbti": "ISFJ",
                "enneagram": "9w3",
                "variant": "sp/so",
                "tritype": 725,
                "socionics": "SEE",
                "sloan": "RCOEN",
                "psyche": "FEVL",
                "image": "https://soulverse.boo.world/images/1.png",
            }
        ];
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