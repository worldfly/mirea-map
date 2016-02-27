'use strict';

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);


const staticConfig = {
    maxAge: 180000,
    index: false,
    etag: true
};
app.use('/public', express.static('public', staticConfig));
app.use('/svg', express.static('svg', staticConfig));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/app.html');
});

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
