module.exports = {
    reduceFieldsToAllowed: function(givenFields, allowedfields) {
        return allowedfields.reduce(function (result, field) {
            if (typeof givenFields[field] == 'undefined') {
                return result;
            }
            result[field] = givenFields[field];
            return result;
        }, {});
    },
    reduceAndEnrichFieldsToAllowed: function(givenFields, allowedfields) {
        return allowedfields.reduce(function (result, field) {
            if (typeof givenFields[field] == 'undefined') {
                result[field] = null;
                return result;
            }
            result[field] = givenFields[field];
            return result;
        }, {});
    }
};