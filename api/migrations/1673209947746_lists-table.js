/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE lists (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            title VARCHAR(50) NOT NULL,
            type VARCHAR(20) DEFAULT 'movies',
            genre VARCHAR(50) NOT NULL
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE lists;
    `);
};
