const User = require('../models/users');
const Expense = require('../models/expense');
const sequelize = require('../database');

exports.getLeaderboard = async(req, res, next)=>{
    try{
    const leaderBoardUsers = await User.findAll({
        attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expense')), 'totalExpense']],
        include: [{model: Expense, attributes:[]}],
        group: ['user.id'],
        order: [['totalExpense', 'DESC']]
    })
    res.status(202).json(leaderBoardUsers);
    }   
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}