var Auth = {
    authorizationChecker: function(req, res, next) {
        if (false && !req.session.user) {
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