const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');

const UserRouter = require('./routers/users');
const ExpenseRouter = require('./routers/expense');
const OrderRouter = require('./routers/orders');
const premiumFeatureRouter = require('./routers/premiumFeature');
const forgotPasswordRouter = require('./routers/forgotpassword');

app.use(express.json());

app.use(UserRouter);
app.use(ExpenseRouter);
app.use(OrderRouter);
app.use(premiumFeatureRouter);
app.use(forgotPasswordRouter);

mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(3000);
    console.log('connected');
}).catch((err)=>{
    console.log(err);
})