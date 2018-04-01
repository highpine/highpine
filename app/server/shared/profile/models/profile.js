/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Person = require('shared/person').models.Person;

let noteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: Person.modelName,
        required: true
    },
    added: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

let Note = mongoose.model('Note', noteSchema);

let karmaSchema = new Schema({
    value: {
        type: Number,
        default: 0
    },
    history: [{
        delta: {
            type: Number,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: Person.modelName
        },
        changed: {
            type: Date,
            required: true
        }
    }]
});

let Karma = mongoose.model('Karma', noteSchema);

let profileSchema = new Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: Person.modelName
    },
    start_date: {
        type: Date
    },
    trial_date: {
        type: Date
    },
    next_eval: {
        type: Date
    },
    notes: [
        {
            type: noteSchema
        }
    ],
    karma: {
        type: karmaSchema,
        default: () => new Karma(),
    }
});

module.exports = mongoose.model('Profile', profileSchema);