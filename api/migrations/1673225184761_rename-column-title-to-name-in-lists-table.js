/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        ALTER TABLE lists
        RENAME COLUMN title TO name;
    `);
};

exports.down = pgm => {
    pgm.sql(`
        ALTER TABLE lists
        RENAME COLUMN name TO title;
    `);
};
