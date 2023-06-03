const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');
const orderController = require('../controllers/orders');

router.get('/purchasepremium', UserController.decodeToken, orderController.purchasePremium);

router.post('/transactionSuccess', UserController.decodeToken, orderController.transactionSuccess);

module.exports = router;