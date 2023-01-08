/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE movie_list (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
            movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE movie_list;
    `);
};
