var LocalStrategy = require('passport-local').Strategy;
var Person = require('shared/person').models.Person;

module.exports = new LocalStrategy(function(username, password, done) {
    Person.findByUsername(username, function(err, person) {
        if (err) {
            return done(err);
        }
        if (!person || !person.passwordIsValid(password)) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        done(null, person);
    });
});