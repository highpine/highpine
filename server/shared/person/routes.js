var models = require('./models');
var express = require('express');
var router = express.Router();
var apiHelper = require('shared/api').helper;

router.get('/people', function (req, res, next) {
    models.Person.find({}, function(err, people) {
        if (err) {
            next(err, req, res);
            return;
        }
        res.json(people.map(function(person) {
            return apiHelper.reduceFields(person, models.Person.apiFields.list);
        }));
    });
});

router.post('/people', function (req, res, next) {
    // todo: don't trust the request
    var person = new models.Person(req.body);
    person.save(function(err) {
        if (err) {
            next(err, req, res);
            return;
        }
        res.statusCode = 201;
        return res.send();
    });
});

router.get('/people/:id', function (req, res, next) {
    let personId = req.params.id;
    var queryParams = getIdQuery(personId);
    models.Person.findOne(queryParams, function(err, person) {
        res.json(apiHelper.reduceFields(person, models.Person.apiFields.view));
    });
});

router.put('/people/:id', function (req, res, next) {
    let personId = req.params.id;
    var queryParams = getIdQuery(personId);
    var data = req.body;
    models.Person.findOne(queryParams, function(err, person) {
        // todo: don't trust request
        person.set(data);
        person.save();
        res.statusCode = 200;
        return res.send();
    });
});

// todo: find a place for this
function getIdQuery(id) {
    var query = {};
    if (id.charAt(0) === '@') {
        query.username = id.substr(1);
    } else {
        query._id = id;
    }
}

module.exports = router;
