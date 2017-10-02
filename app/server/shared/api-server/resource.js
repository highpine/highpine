/**
 * Copyright © 2017 Highpine. All rights reserved.
 *
 * @author    Max Gopey <gopeyx@gmail.com>
 * @copyright 2017 Highpine
 * @license   https://opensource.org/licenses/MIT  MIT License
 */

let ApiError = require('./api-error');
let BasicApiModel = require('./basic-api-model');

/**
 * @param {object} mongooseModel Mongoose model.
 * @param {object} apiModel API model.
 * @param {boolean} get
 * @param {boolean} list
 * @param {boolean} create
 * @param {boolean} update
 * @param {boolean} remove
 */
function createResourceRouter(mongooseModel,
                              apiModel = null,
                              get = true,
                              list = true,
                              create = true,
                              update = true,
                              remove = true) {

    let router = require('express').Router();
    if (!apiModel) {
        apiModel = new BasicApiModel;
    }

    router.param('documentId', function (req, res, next, id) {
        let queryParams = apiModel.getIdQuery(id, req);
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
                    return apiModel.toPlainObject(document);
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
            res.json(apiModel.toPlainObject(req.document));
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
 * @param {object} apiModel Api model.
 * @param {boolean} get
 * @param {boolean} list
 * @param {boolean} create
 * @param {boolean} update
 * @param {boolean} remove
 */
function ApiResource(mongooseModel, apiModel = null, get = true, list = true, create = true, update = true, remove = true) {
    this.router = createResourceRouter(mongooseModel, apiModel, get, list, create, update, remove);
}

module.exports = ApiResource;