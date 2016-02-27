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

app.get('/', (req, res) => res.sendFile(__dirname + '/app/app.html'));

app.get('/favicon.ico', (req, res) => res.sendfile(__dirname + '/public/app/images/favicon.ico'));

app.listen(app.get('port'), () => console.log('Server listening on port ' + app.get('port')));
