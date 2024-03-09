const express = require('express');

const profileRoutes = require('../../src/routes/profiles-routes');
const commentRoutes = require('../../src/routes/comments-routes');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use(express.json());
app.use(profileRoutes);
app.use(commentRoutes);

module.exports = { app };