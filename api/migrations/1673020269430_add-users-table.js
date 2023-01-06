/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(20) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            profilePic VARCHAR(200) DEFAULT '',
            isAdmin BOOLEAN DEFAULT FALSE
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE users;
    `);
};
