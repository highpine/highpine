var ApiError = require('./error');

/**
 * @param {object} mongooseModel Mongoose model.
 */
function createResourceRouter(mongooseModel) {
    var router = require('express').Router();

    router.param('documentId', function (req, res, next, id) {
        var queryParams = typeof mongooseModel.getIdQuery == "function" ? mongooseModel.getIdQuery(id) : {_id: id};
        var query = mongooseModel.findOne(queryParams);
        if (req.query.populate) {
            query.populate(req.query.populate);
        }
        query.exec(function (err, document) {
            if (err) {
                return next(err);
            }
            if (!document) {
                return next(ApiError.withStatusCode(404, mongooseModel.modelName + ' not found'));
            }
            req.document = document;
            next();
        });
    });

    router.get('/', function (req, res, next) {
        var query = mongooseModel.find({});
        if (req.query.populate) {
            query.populate(req.query.populate);
        }
        query.exec(function (err, documents) {
            if (err) {
                return next(err);
            }
            res.json(documents.map(function (document) {
                return document.toObject();
            }));
        });
    });

    router.post('/', function (req, res, next) {
        var documentData = req.body;
        var document = new mongooseModel(documentData);
        document.save(function (err) {
            if (err) {
                return next(err);
            }
            res.statusCode = 201;
            return res.send();
        });
    });

    router.get('/:documentId', function (req, res) {
        res.json(req.document.toObject());
    });

    router.put('/:documentId', function (req, res, next) {
        var fieldsToSet = req.body;
        req.document.set(fieldsToSet);
        req.document.save(function (err) {
            if (err) {
                return next(err);
            }
            res.statusCode = 200;
            return res.send();
        });
    });

    // router.patch('/:documentId', function (req, res, next) {
    //     console.log(req.document);
    //     var fieldsToSet = req.body;
    //     mongooseModel.update({_id: req.document.id}, {$set: fieldsToSet}, function (err) {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.statusCode = 200;
    //         return res.send();
    //     });
    // });

    router.delete('/:documentId', function (req, res, next) {
        req.document.remove(function (err, raw) {
            if (err) {
                return next(err);
            }
            res.statusCode = 200;
            return res.send();
        });
    });

    return router;
}

/**
 * @param {object} mongooseModel Mongoose model.
 */
function ApiResource(mongooseModel, populate) {
    this.router = createResourceRouter(mongooseModel, populate);
}

module.exports = ApiResource;