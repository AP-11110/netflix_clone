const dotenv = require("dotenv").config();
const app = require('./src/app');
const pool = require('./src/pool');
const PORT = process.env.PORT || 8800;

pool.connect({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}).then(() => {
    app().listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}).catch((err) => console.error(err));
