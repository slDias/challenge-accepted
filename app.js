const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const locateRouter = require('./routes/locate');
const forecastRouter = require('./routes/forecast');
const mapDataRouter = require('./routes/mapData');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/locate', locateRouter);
app.use('/forecast', forecastRouter);
app.use('/mapdata', mapDataRouter);

module.exports = app;
