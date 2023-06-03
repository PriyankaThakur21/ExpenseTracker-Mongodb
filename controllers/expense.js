const Expense = require('../models/expense');

exports.postExpense = async(req, res, next)=>{
    const{expense, description, category} = req.body;
    try{
    const data = await Expense.create({expense, description, category, userId:req.user.id});
    console.log('Post  '+data);
    res.json(data);
}
catch(error){
    console.log(error);
}
}

exports.getExpenses = async (req, res, next)=>{
    try{
    const expenses = await Expense.findAll({where:{userId: req.user.id}});
    console.log('Priyanka'+expenses)
    res.status(201).json({expense: expenses, premiumUser: req.user.isPremiumUser});
    }
    catch(error){
        console.log(error);
    }
}

exports.deleteExpenses = async(req, res, next)=>{
    const ExpenseId = req.params.id;
    try{
    const deleteExpense = await Expense.destroy({where: {id: ExpenseId, userId:req.user.id}});
    res.json(deleteExpense);
    }
    catch(error){
        console.log(error);
    }
}