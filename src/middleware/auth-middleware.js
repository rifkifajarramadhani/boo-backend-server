const User = require('../model/users-model');
const mongoose = require('mongoose');

const authMiddleware = async (req, res, next) => {
    try {
        const name = req.get('authorization');
        if (!name) {
            res.status(401).json({
                errors: 'Unauthorized'
            }).end();
        } else {
            const user = await User.findOne({ name: name });
            if (!user) {
                res.status(401).json({
                    errors: 'Unauthorized'
                }).end();
            } else {
                req.user = user;
                next();
            }
        }
    } catch (e) {
        next();
    }
}

module.exports = authMiddleware