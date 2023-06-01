const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const sequelize = require('./database');

const router = require('./routers');

const Users = require('./models/users');
const Expenses = require('./models/expense');

app.use(express.json());

app.use(router);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

sequelize.sync(
)
.then((res)=>{
    app.listen(8080);
})
.catch((err)=>{
    console.log(err);
})