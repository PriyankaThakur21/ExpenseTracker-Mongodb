const sequelize = require('../database');
const Expense = require('../models/expense');
const Users = require('../models/users');

exports.postExpense = async(req, res, next)=>{
try{
    const t = await sequelize.transaction();
    const{expense, description, category} = req.body;
    const data = await Expense.create({expense, description, category, userId:req.user.id}, {transaction:t});

    const totalexpense = Number(req.user.totalExpense)+ Number(expense);
    console.log(totalexpense);

    try{
    await Users.update({totalExpense: totalexpense}, {where:{id: req.user.id}, transaction:t})
    await t.commit();
    res.json(data);
    }
    catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }
}
catch(error){
    await t.rollback();
    console.log(error);
    res.status(500).json(err);
}
}

exports.getExpenses = async (req, res, next)=>{
    try{
        console.log(req.query)
        const page = req.query.page;
        const rowslimit = req.header('rowslimit');
        console.log(rowslimit)
        let totalItems = await Expense.count();
        const expenses = await req.user.getExpenses({
        offset: (page - 1) * rowslimit,
        limit: Number(rowslimit),
        order: [['id', 'DESC']]
    });
    res.status(201).json({
        expense: expenses,
        premiumUser: req.user.isPremiumUser,
        currentPage: page,
        nextPage: Number(page) + 1,
        hasNextPage: page * 5 < totalItems,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json('Something went wrong');
    }
}

exports.deleteExpenses = async(req, res, next)=>{
    const t = await sequelize.transaction();
    const ExpenseId = req.params.id;
    try{
    const findexpense = await Expense.findOne({where: {id: ExpenseId}});
    const deleteExpense = await Expense.destroy({where: {id: ExpenseId, userId:req.user.id}, transaction:t});
    console.log(deleteExpense)
    console.log(findexpense.expense);
    const totalexpense = Number(req.user.totalExpense)- Number(findexpense.expense);
    console.log(totalexpense);

    try{
    await Users.update({totalExpense: totalexpense}, {where:{id: req.user.id}, transaction:t})
    await t.commit();
    res.status(201).json(deleteExpense);
    }
    catch(err){
        await t.rollback();
        console.log(err);
        res.status(500).json(err);
    }  

    }
    catch(error){
        console.log(error);
        res.status(500).json(err);
    }
}