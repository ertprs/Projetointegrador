var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const availabilityRouter = require('./routes/availability');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
const appointmentRouter = require('./routes/appointments');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/availability', availabilityRouter);
module.exports = app;
