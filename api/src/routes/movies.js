const router = require("express").Router();
const verifyToken = require("../verifyToken");
const MovieRepo = require('../repos/movie-repo');

// create
router.post("/", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const savedMovie = await MovieRepo.insert(req.body);
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// update
router.put("/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const updatedMovie = await MovieRepo.update(req.params.id, req.body);
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const deletedMovie = await MovieRepo.delete(req.params.id);
            res.status(200).json(deletedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// get
router.get("/find/:id", async (req, res) => {
    try {
        const movie = await MovieRepo.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get random with optional ?type=series
router.get("/random", async (req, res) => {
    const typeQuery = req.query.type === 'series' ? true : false;
    try {
        const movie = await MovieRepo.getRandomMovie(typeQuery);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all movies
router.get("/", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const movies = await MovieRepo.find();
            res.status(200).json(movies); 
        } catch (err) {
            res.status(500).json(err);
        }
    } else res.status(403).json("Not authorized!");   
});

// get movie list with optional type & genre query
router.get("/random/list", async (req, res) => {
    const typeQuery = req.query.type === 'series' ? true : false;
    const genreQuery = req.query.genre;
    try {
        const movies = await MovieRepo.getRandomMovies(typeQuery, genreQuery);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;