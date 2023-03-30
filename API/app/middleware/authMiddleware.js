const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
         const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: 'user is not authorized'})
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        req.user = decodedToken;
        next();
    }
    catch(error) {
        console.log(error);
        return res.status(403).json({message: 'error user is not authorized'})
    }
}