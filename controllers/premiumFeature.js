const User = require('../models/users');
const Expense = require('../models/expense');

exports.getLeaderboard = async(req, res, next)=>{
    try{
    const leaderBoardUsers = await User.findAll({order: [['totalExpense', 'DESC']]});
    res.status(202).json(leaderBoardUsers);
    }   
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}