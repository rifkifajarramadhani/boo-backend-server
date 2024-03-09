'use strict';

const express = require('express');
const connect = require('./config/db');

const profileRoutes = require('./routes/profiles-routes');
const commentRoutes = require('./routes/comments-routes');

const app = express();
const PORT =  process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// routes
app.use(express.json());
app.use(profileRoutes);
app.use(commentRoutes);

// start db connection and server
connect().then(() => {
    try {
        app.listen(PORT, () => {
            console.log('Express started. Listening on %s', PORT);
        });
    } catch (e) {
        console.log('Cannot connect to server');
    }
}).catch((err) => {
    console.log(err);
    console.log('DB connection failed');
});
