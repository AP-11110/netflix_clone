const pool = require('../pool');

class ListRepo {

    // creating a new list
    static async insert(list) {
        const { title, type, genre } = list;
        const { rows } = await pool.query
            (`INSERT INTO lists (name, type, genre) 
            VALUES($1, $2, $3) 
            RETURNING *;`
            , [title, type, genre]);
        return rows[0];
    }

    // deleting a list
    static async delete(id) {
        const { rows } = await pool.query('DELETE FROM lists WHERE id = $1 RETURNING *;', [id]);
        return rows[0];
    }

    // creating movie-list relationship
    static async movieList(values) {
        const { listId, movieId } = values;
        const { rows } = await pool.query(`
            INSERT INTO movie_list (list_id, movie_id)
            VALUES($1, $2)
            RETURNING *;`, [listId, movieId]);

        return rows[0];
    }

    static async getRandomLists(typeQuery, genreQuery) {
        let list;
        if(genreQuery) {
            list = await pool.query(`
                WITH l AS (
                    SELECT * FROM lists
                    WHERE type = $1 AND genre = $2
                    ORDER BY random()
                    LIMIT 10
                )
                SELECT * FROM movie_list 
                JOIN l ON l.id = movie_list.list_id
                JOIN movies ON movies.id = movie_list.movie_id;
            `, [typeQuery, genreQuery]);
        } else {
            list = await pool.query(`
                WITH l AS (
                    SELECT * FROM lists
                    WHERE type = $1
                    ORDER BY random()
                    LIMIT 10
                )
                SELECT * FROM movie_list 
                JOIN l ON l.id = movie_list.list_id
                JOIN movies ON movies.id = movie_list.movie_id;
            `, [typeQuery]);
        }

        return list.rows;
    }
}


module.exports = ListRepo;