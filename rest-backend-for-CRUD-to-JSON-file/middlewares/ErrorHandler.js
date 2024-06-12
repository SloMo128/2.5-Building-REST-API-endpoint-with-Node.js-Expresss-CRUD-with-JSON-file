const ErrorHandler = (err, req, res, next) => {
    var environment = process.env.NODE_ENV || 'development';

    console.log("Middleware Error Handling");
    res.json({
        success: false,
        status: err.statusCode || 500,
        message: err.message || 'Something went wrong',
        stack: environment === 'development' ? err.stack : {}
    })
}

module.exports = ErrorHandler;