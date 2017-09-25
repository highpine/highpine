let ApiError = require('./api-error');

/**
 * @param {object} mongooseModel Mongoose model.
 * @param {boolean} get
 * @param {boolean} list
 * @param {boolean} create
 * @param {boolean} update
 * @param {boolean} remove
 */
function createResourceRouter(mongooseModel,
                              get = true,
                              list = true,
                              create = true,
                              update = true,
                              remove = true) {

    let router = require('express').Router();

    router.param('documentId', function (req, res, next, id) {
        let queryParams = typeof mongooseModel.getIdQuery === "function" ?
            mongooseModel.getIdQuery(id, req) :
            {_id: id};
        let query = mongooseModel.findOne(queryParams);
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

    if (list) {
        router.get('/', function (req, res, next) {
            let query = mongooseModel.find({});
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
    }

    if (create) {
        router.post('/', function (req, res, next) {
            let documentData = req.body;
            let document = new mongooseModel(documentData);
            document.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.statusCode = 201;
                return res.send();
            });
        });
    }

    if (get) {
        router.get('/:documentId', function (req, res) {
            res.json(req.document.toObject());
        });
    }

    if (update) {
        router.put('/:documentId', function (req, res, next) {
            let fieldsToSet = req.body;
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
    }

    if (remove) {
        router.delete('/:documentId', function (req, res, next) {
            req.document.remove(function (err, raw) {
                if (err) {
                    return next(err);
                }
                res.statusCode = 200;
                return res.send();
            });
        });
    }

    return router;
}

/**
 * @param {object} mongooseModel Mongoose model.
 * @param {boolean} get
 * @param {boolean} list
 * @param {boolean} create
 * @param {boolean} update
 * @param {boolean} remove
 */
function ApiResource(mongooseModel, get = true, list = true, create = true, update = true, remove = true) {
    this.router = createResourceRouter(mongooseModel, get, list, create, update, remove);
}

module.exports = ApiResource;