const express = require('express');
const router = express.Router();

const UserController = require('./controllers/users');

router.post('/users', UserController.PostUsers);

module.exports = router;