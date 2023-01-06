const pool = require('../pool');

class MovieRepo {

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM movies WHERE id = $1;', [id]);
        return rows[0];
    }

    // all movies
    static async find() {
        const { rows } = await pool.query('SELECT * FROM movies ORDER BY id DESC;', [id]);
        return rows;
    }

    static async insert(movie) {
        const { title, about, img, imgTitle, imgSm, trailer, video, year, ageLimit, genre, isSeries } = movie;
        const { rows } = await pool.query
            (`INSERT INTO users (title, about, img, imgTitle, imgSm, trailer, video, year, ageLimit, genre, isSeries) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
            RETURNING *;`
            , [title, about, img, imgTitle, imgSm, trailer, video, year, ageLimit, genre, isSeries]);
        return rows[0];
    }

    static async update(id, movie) {
        const { title, about, img, imgTitle, imgSm, trailer, video, year, ageLimit, genre, isSeries } = movie;
        const { rows } = await pool.query(`
            UPDATE movies 
            SET title = COALESCE($1, title), 
                about = COALESCE($2, about), 
                img = COALESCE($3, img), 
                imgTitle = COALESCE($4, imgTitle), 
                imgSm = COALESCE($5, imgSm), 
                trailer = COALESCE($6, trailer), 
                video = COALESCE($7, video), 
                year = COALESCE($8, year), 
                ageLimit = COALESCE($9, ageLimit), 
                genre = COALESCE($10, genre), 
                isSeries = COALESCE($11, isSeries), 
                WHERE id = $12 RETURNING *;`, 
            [title, about, img, imgTitle, imgSm, trailer, video, year, ageLimit, genre, isSeries, id]);
        return rows[0];
    }

    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *;', [id]);
        return rows[0];
    }

    static async getRandomMovie(isSeries) {
         const { rows } = await pool.query(`
                SELECT * FROM movies
                WHERE isSeries = $1
                ORDER BY random()
                LIMIT 1;
            `, [isSeries])
        return rows[0];
    }

    static async getRandomMovies(isSeries, genreQuery) {
        let list;
        if(genreQuery) {
            list = await pool.query(`
                SELECT * FROM movies
                WHERE isSeries = $1 AND genre = $2
                ORDER BY random()
                LIMIT 10;
            `, [isSeries, genreQuery]);
        } else {
            list = await pool.query(`
                SELECT * FROM movies
                WHERE isSeries = $1
                ORDER BY random()
                LIMIT 10;
            `, [isSeries]);
        }

        return list.rows;
    }
}

