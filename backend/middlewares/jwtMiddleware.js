const jwt = require('jsonwebtoken')

const jwtMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token, process.env.SECRETKEY)
        console.log(jwtResponse)

        req.payload = jwtResponse.userId
        next()

    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

module.exports = jwtMiddleware