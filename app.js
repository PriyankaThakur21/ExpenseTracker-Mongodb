const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const sequelize = require('./database');

const UserRouter = require('./routers/users');
const ExpenseRouter = require('./routers/expense');
const OrderRouter = require('./routers/orders');
const premiumFeatureRouter = require('./routers/premiumFeature');
const forgotPasswordRouter = require('./routers/forgotpassword');

const Users = require('./models/users');
const Expenses = require('./models/expense');
const Orders = require('./models/orders');

app.use(express.json());

app.use(UserRouter);
app.use(ExpenseRouter);
app.use(OrderRouter);
app.use(premiumFeatureRouter);
app.use(forgotPasswordRouter);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);
Users.hasMany(Orders);
Orders.belongsTo(Users);

sequelize.sync()
.then((res)=>{
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
})