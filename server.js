'use strict';

const express = require('express');
const app = express();

app.set('port', process.env.PORT | 3000);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/app.html');
});

require('http').createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
