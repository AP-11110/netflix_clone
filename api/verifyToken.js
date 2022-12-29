const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        // verifying jwt token that's part of the bearer token
        // extracting user info from the token & assigning it to the request
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports = verify;