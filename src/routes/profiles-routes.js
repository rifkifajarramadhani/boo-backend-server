'use strict';

const express = require('express');
const profileController = require('../controller/profiles-controller');
const authMiddleware = require('../middleware/auth-middleware');
const errorMiddleware = require('../middleware/error-middleware');

const router = express.Router();

// test render in page, ignore auth middleware, open this after access add user endpoint (by postman or something similar)
router.get('/profile-render/:id', profileController.getUserByIdRender);

// register user
router.post('/profile', profileController.createUser);

router.use(authMiddleware);
router.get('/profile/:id', profileController.getUserById);

router.use(errorMiddleware);

module.exports = router;
