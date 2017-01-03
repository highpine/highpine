module.exports = {
    statusCode: {
        isInRange: (code, leftBound, rightBound) => code >= leftBound && code <= rightBound,
        is1xx: (code) => this.isInRange(code, 100, 199),
        is2xx: (code) => this.isInRange(code, 200, 299),
        is3xx: (code) => this.isInRange(code, 300, 399),
        is4xx: (code) => this.isInRange(code, 400, 499),
        is5xx: (code) => this.isInRange(code, 500, 599)
    }
};