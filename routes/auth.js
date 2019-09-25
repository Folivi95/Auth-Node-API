const router = require('express').Router();
const User = require('../model/User');

router.post('/register', (req, res) => {
    res.send('Registration Successful');
})

module.exports = router;