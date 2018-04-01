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

let projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    jira_id: {
        type: String
    },
    desired_number_of_assignees: {
        type: Number
    },
    assignees: [
        {
            type: Schema.Types.ObjectId,
            ref: Person.modelName
        }
    ],
    picture: {
        type: String
    }
});

module.exports = mongoose.model('Project', projectSchema);