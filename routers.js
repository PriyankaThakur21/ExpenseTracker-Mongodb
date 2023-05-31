const express = require('express');
const router = express.Router();

const UserController = require('./controllers/users');
const expenseController = require('./controllers/expense');

router.post('/signin', UserController.signinUsers);

router.post('/login', UserController.loginUsers);

router.post('/postexpense', expenseController.postExpense);

router.get('/getexpenses', expenseController.getExpenses);

router.delete('/deleteexpense/:id', expenseController.deleteExpenses);

module.exports = router;