const express = require('express');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(authRoute);
    app.use(userRoute);
    app.use(movieRoute);
    
    return app;
}