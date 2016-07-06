var Auth = {
    STATUS_SUCCESS: 'success',
    STATUS_ERROR: 'error',

    authorizationChecker: function(req, res, next) {
        if (!req.session.jiraToken) {
            var error = new Error('Unauthorized.');
            error.status = 401;
            next(error);
        }
        next();
    },
    getUser: function(req) {
        return req.session.user;
    }
};

module.exports = Auth;