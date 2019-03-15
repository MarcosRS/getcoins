require('dotenv').config();
// require('./db');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const start = require('./start');

app.set('port', (process.env.PORT || 3000));
// const env = process.env.NODE_ENV || 'development';

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const server = app.listen(app.get('port'), function () {
    console.log('Node app is running on port:', app.get('port'));
});

start.init();

module.export = server;