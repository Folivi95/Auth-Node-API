const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

//Registration API
router.post('/register', async (req, res) => {

    //LETS VALIDATE THE DATA BEFORE WE POST USER
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Check if user is in database
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});


//Login API
router.post('/login', async (req, res) => {

    //LETS VALIDATE THE DATA BEFORE WE POST USER
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Check if user is in database
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send('Oops!!! Email is not registered');
    }

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Incorrect Password');
    }

    //create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;