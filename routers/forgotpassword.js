const express = require('express');
const router = express.Router();

const forgotpasswordController = require('../controllers/forgotpassword');

router.post('/password/forgotpassword', forgotpasswordController.forgotpassword);

module.exports = router;