const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        ...req.body,
        password: hash,
    });

    try {
        const user = await newUser.save();
        const { password, ...info } = user._doc;
        res.status(201).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if(!user) res.status(401).json("Wrong password or username");
        
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isCorrect) res.status(401).json("Wrong password or username");
        else {
            const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });
            // excluding password from response
            const { password, ...info } = user._doc;
            res.status(200).json({...info, accessToken});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// const isCorrect = await bcrypt.compare(req.body.password, user.password);

module.exports = router;