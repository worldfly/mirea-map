'use strict';

const express = require('express');
const app = express();

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/app.html');
});

app.listen(3000);
