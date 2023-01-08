const router = require("express").Router();
const bcrypt = require("bcryptjs");
const verifyToken = require("../verifyToken");
const UserRepo = require('../repos/user-repo');

// update
router.put("/:id", verifyToken, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;
        }
        try {
            const updatedUser = await UserRepo.update(req.params.id, req.body)
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
            const deletedUser = await UserRepo.delete(req.params.id);
            res.status(200).json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("You can only delete your own account");
});

// get
router.get("/find/:id", async (req, res) => {
    
    try {
        const user = await UserRepo.findById(req.params.id);
        const { password, ...info } = user;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all
router.get("/", verifyToken, async (req, res) => {
    // query will come in the form ?new=true
    const query = req.query.new;
    const count = req.query.count;
    if(req.user.isAdmin) {
        try {
            const users = await UserRepo.find(query, count);
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
        
    } else res.status(403).json("Not authorized");
});

// get user stats
router.get("/stats", verifyToken, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const data = await UserRepo.userStats();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    } else res.status(403).json("Not authorized");
});

module.exports = router;