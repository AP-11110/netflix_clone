const router = require("express").Router();
const Movie = require("../models/Movie");
const verifyToken = require("../verifyToken");

// create
router.post("/", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
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
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

module.exports = router;