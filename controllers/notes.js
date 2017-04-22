var Notes = require('../models/schemas/notes.js');

module.exports.getAllNotes = function(req, res, next) {
    Notes.find({}, function(err, notes) {
        if (err) return next(err);
        res.json(notes);
    });
};

module.exports.getNoteById = function(req, res, next) {
    Notes.findById(req.params.id, function(err, note) { 
        if (err) return next(err);
        res.json(note);
    });
};

module.exports.createNote = function(req, res, next) {
    var newNote = new Notes(req.body);

    newNote.save(function(err, note) {
        if (err) return next(err);
        res.sendStatus(200);
    });
};

module.exports.updateNote = function(req, res, next) {
    Notes.findOneAndUpdate({id: req.param.id}, req.body, function(err, note) {
        if (err) return next(err);
        return res.sendStatus(200);
    });
};

module.exports.deleteNoteById = function(req, res, next) {
    Notes.findOneAndRemove(req.params.id, function(err, note) {
        if (err) return next(err);
        if (!note) return res.status(404).send("No Note with that ID");
        return res.sendStatus(200);
    });
};
