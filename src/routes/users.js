const express = require('express');
const router = express.Router();
router.get('/',(req, res) =>
    res.send('get all users'));
router.post('/', (req, res) =>
res.send('create a new user'));
module.exports = router;