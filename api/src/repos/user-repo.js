const pool = require('../pool');
const { randomBytes } = require('crypto');
class UserRepo {
    // if query provided retrieve most recent users (limit by count if provided else default to 10)
    // otherwise retrieve all users
    static async find(query, count = 10) {
        if(query) {
            const { rows } = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT $1;', [count]);
            return rows;
        } else {
            const { rows } = await pool.query('SELECT * FROM users LIMIT;');
            return rows;
        }
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
        return rows[0];
    }

    static async findByUsername(username) {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
        return rows[0];
    }

    static async insert(user) {
        
        const { username, email, password, profilePic, isAdmin } = user;

        // temp fix, username field need to be implemented
        const randomUsername = randomBytes(4).toString('hex');
        
        const { rows } = await pool.query
            ('INSERT INTO users (username, email, password, profilepic, isadmin) VALUES($1, $2, $3, $4, $5) RETURNING *;'
            , [randomUsername, email, password, profilePic, isAdmin]);
        
        return rows[0];
    }

    static async update(id, user) {
        const { username, email, password, profilePic, isAdmin } = user;
        const { rows } = await pool.query(`
            UPDATE users 
            SET username = COALESCE($1, username), 
                email = COALESCE($2, email), 
                password = COALESCE($3, password), 
                profilePic = COALESCE($4, profilePic), 
                isAdmin = COALESCE($5, isAdmin) WHERE id = $6 RETURNING *;`, 
            [username, email, password, profilePic, isAdmin, id]);
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);
        return rows[0];
    }

    static async userStats() {
        const { rows } = await pool.query(`
            SELECT EXTRACT(YEAR FROM created_at) AS year, 
            EXTRACT(MONTH FROM created_at) AS month,
            COUNT(*) as total
            FROM users GROUP BY year, month;
        `);
        return rows;
    }
}

module.exports = UserRepo;
