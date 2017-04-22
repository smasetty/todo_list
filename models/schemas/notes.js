const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notesSchema = new Schema({
    title: {type: String, required: true, trim: true},
    notes: {type: String, trim: true},
    markAsDone: {type: Boolean},
    finishByDate: {type: [Date], index: true}
},
{
    toObject: {getters: true},
    timestamps: {
        createdAt: 'createdDate',
        updateAt: 'updateAt',
    }
}
);

notesSchema.pre('save', function(callback) {


    callback();
});

var Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
