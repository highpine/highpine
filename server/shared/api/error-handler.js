module.exports = function(environment) {
    let isDevMode = environment === 'development';
    return function(err, req, res, next) {
        if (err instanceof Error) {
            if (err.name == 'ValidationError') {
                err.status = 400;
            }
            res.statusCode = err.status || 500;
            if (res.statusCode >= 400 && res.statusCode < 500) {
                res.json({
                    message: err.message
                });
            } else if (res.statusCode >= 500 && res.statusCode < 600) {
                res.json({
                    message: isDevMode ? 'Server error: ' + err : 'Server error'
                });
                console.warn('Internal error(%d): %s', res.statusCode, err.message);
            }
        } else {
            next();
        }
    }
};