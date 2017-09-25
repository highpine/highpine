var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Person = require('shared/person').models.Person;

var noteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    added: Date,
    content: String
}, {
    toObject: {
        versionKey: false
    }
});

var karmaSchema = new Schema({
    value: {
        type: Number,
        default: 0
    },
    history: [{
        delta: Number,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Person'
        },
        changed: Date
    }]
}, {
    toObject: {
        versionKey: false
    }
});

var profileSchema = new Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    },
    start_date: Date,
    trial_date: Date,
    next_eval: Date,
    notes: [noteSchema],
    karma: karmaSchema
}, {
    toObject: {
        versionKey: false
    }
});

module.exports.Note = mongoose.model('Note', noteSchema);
module.exports.Karma = mongoose.model('Karma', karmaSchema);
module.exports.Profile = mongoose.model('Profile', profileSchema);