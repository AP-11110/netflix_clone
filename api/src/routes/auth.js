const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepo = require('../repos/user-repo');

// register
router.post("/register", async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = await UserRepo.insert({ ...req.body, password: hash });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await UserRepo.findByUsername(req.body.username);
        if(!user) res.status(401).json("Wrong password or username");
        
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) res.status(401).json("Wrong password or username");
        else {
            const accessToken = jwt.sign({ id: user.id, isAdmin: user.isadmin }, process.env.SECRET_KEY, { expiresIn: "5d" });
            // excluding password from response
            const { password, ...info } = user;
            res.status(200).json({...info, accessToken});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;