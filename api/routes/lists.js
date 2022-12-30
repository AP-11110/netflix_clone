const router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../verifyToken");

// create
router.post("/", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("List deleted");
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized!");
});

// get movie list with optional type & genre query
router.get("/", verifyToken, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery) {
            if(genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 }},
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 }},
                    { $match: { type: typeQuery } }
                ])
            }
        } else { // if genre or type not provided we're in home page
            list = await List.aggregate([{ $sample: { size: 10 }}]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;