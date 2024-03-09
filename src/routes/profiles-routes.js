'use strict';

const express = require('express');
const profileController = require('../controller/profiles-controller');
const authMiddleware = require('../middleware/auth-middleware');
const errorMiddleware = require('../middleware/error-middleware');

const router = express.Router();

// register user
router.post('/profile', profileController.createUser);

router.use(authMiddleware);
router.get('/profile/:id', profileController.getUserById);

// test render in page
router.get('/profile-render/:id', profileController.getUserByIdRender);

router.use(errorMiddleware);

module.exports = router;
