const express = require('express');
const path = require('path');
const app  = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set up public directory
app.use(
    express.static(path.join(__dirname, 'public'), {
        maxAge: 1000 * 60 * 60 * 24  // 1 day cache
    })
);

app.use((req, res, next) => {
    return res.render('index', {
        js: '/build/js/test.js'
    });
});

module.exports = app;