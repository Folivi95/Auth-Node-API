const router = require('express').Router();

router.post('/register', (req, res) => {
    res.send('Registration Successful');
})

module.exports = router;