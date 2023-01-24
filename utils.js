const morgan = require('morgan')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const accessControl = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, OPTIONS')
    next()
}

const logger = () => {
    morgan.token('body', function (req) {
        return JSON.stringify(req.body)
    })

    return morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
}
module.exports = {
    errorHandler,
    unknownEndpoint,
    accessControl,
    logger,
}
