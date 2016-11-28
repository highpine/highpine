module.exports = {
    reduceFields: function(model, fields) {
        return fields.reduce(function (result, field) {
            result[field] = model[field] || null;
            return result;
        }, {});
    }
};