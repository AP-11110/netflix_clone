const pg = require('pg');

// different config due to test setup
class Pool {
    _pool = null;

    connect(options) {
        this._pool = new pg.Pool(options);
        // testing connection, returns a promise
        return this._pool.query('SELECT 1 + 1;');
    }

    close() {
        this._pool.end();
    }

    query(sql, params) {
        return this._pool.query(sql, params);
    }
}

module.exports = new Pool();