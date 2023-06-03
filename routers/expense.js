const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');
const expenseController = require('../controllers/expense');

router.post('/postexpense', UserController.decodeToken, expenseController.postExpense);

router.get('/getexpenses', UserController.decodeToken, expenseController.getExpenses);

router.delete('/deleteexpense/:id', UserController.decodeToken, expenseController.deleteExpenses);

module.exports = router;