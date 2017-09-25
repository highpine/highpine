var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Person = require('shared/person').models.Person;

var projectSchema = new Schema({
    name: String,
    jira_id: String,
    desired_number_of_assignees: String,
    assignees: [
        {type: Schema.Types.ObjectId, ref: 'Person'}
    ],
    picture: String
});
projectSchema.set('toObject', { versionKey: false });

module.exports.Project = mongoose.model('Project', projectSchema);