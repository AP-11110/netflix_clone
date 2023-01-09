const router = require("express").Router();
const ListRepo = require('../repos/list-repo');
const verifyToken = require("../verifyToken");

// create list
router.post("/", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const savedList = await ListRepo.insert(req.body);
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

router.post("/movie", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const savedMovieList = await ListRepo.movieList(req.body);
            console.log(savedMovieList)
            res.status(201).json(savedMovieList);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const deletedList = await ListRepo.delete(req.params.id);
            res.status(201).json(deletedList);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// get 
router.get("/", verifyToken, async (req, res) => {
    const type = req.query.type === 'series' ? 'series' : 'movies';
    const genreQuery = req.query.genre;
    if(req.user.isAdmin) {
        try {
            const lists = await ListRepo.getRandomLists(type, genreQuery);
            res.status(201).json(lists);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

module.exports = router;