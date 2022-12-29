const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verifyToken = require("../verifyToken");

// update
router.put("/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
                { $set: req.body }, 
                { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("You can only update your own account");
});

// delete
router.delete("/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("You can only delete your own account");
});

// get
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all
router.get("/", verifyToken, async (req, res) => {
    // query will come in the form ?new=true
    const query = req.query.new;
    if(req.user.isAdmin) {
        try {
            // if query provided retrieve only 5 most recent users (sort & retrieve so that the most recent users are on the top)
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized");
});

// get user stats
router.get("/stats", async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                // passing along the documents to the next stage in the pipeline
                $project: {
                    month: {$month: "$createdAt"}
                }
            }, {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;