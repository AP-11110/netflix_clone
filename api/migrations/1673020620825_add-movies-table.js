/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE movies (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            title VARCHAR(50) NOT NULL UNIQUE,
            about VARCHAR(200),
            img VARCHAR(200),
            imgTitle VARCHAR(200),
            imgSm VARCHAR(200),
            trailer VARCHAR(200),
            video VARCHAR(200),
            year INTEGER,
            ageLimit INTEGER,
            genre VARCHAR(50),
            isSeries BOOLEAN DEFAULT FALSE
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE movies;
    `);
};
