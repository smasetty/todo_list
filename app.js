const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./models/config');
const notes = require('./controllers/notes.js');

mongoose.Promise = require('bluebird');
mongoose.connect(config.dbUrl, {server: {socketOptions: {keepAlive: 120}}});

var app = express();
var router = express.Router();

if(app.get('env')!== 'production') {
  app.use(logger('dev'));
  var dev = true;
} 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router.param('id', function(req, res, next, id) {
  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send('Invalid ID');
  next();
}); 

router.route('/notes')
    .get(notes.getAllNotes)
    .post(notes.createNote);

router.route('/notes/:id')
    .get(notes.getNoteById)
    .put(notes.updateNote)
    .delete(notes.deleteNoteById);

app.use('/', router);

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).send();
  });
}

app.use(function(err, req, res, next){
  res.status(err.status || 500).send();
});

var server = app.listen(config.port);
console.log('Listening at port: ' + config.port + ". ");

module.exports = app;
