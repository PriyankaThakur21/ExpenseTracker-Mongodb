const Expense = require('../models/expense');
const Users = require('../models/users');

exports.postExpense = async(req, res, next)=>{
try{
    const{expense, description, category} = req.body;
    const data = await Expense.create({
        expense:expense, 
        description:description, 
        category:category, 
        userId:req.user.id
    });
    const totalexpense = Number(req.user.totalExpense)+ Number(expense);
    const user = await Users.findOne({ _id: req.user.id });
    await user.updateOne({totalExpense: totalexpense});
    console.log(data);
    res.status(201).json(data);
    }
catch(error){
    console.log(error);
    res.status(500).json(err);
}
}

exports.getExpenses = async (req, res, next)=>{
    try{
        const page = req.query.page;
        const rowslimit = req.header('rowslimit');
        const totalexpense = await Expense.find({ userId: req.user.id });
        let totalItems = totalexpense.length;
        const expenses = await Expense.find({userId: req.user.id })
        .skip((page - 1) * rowslimit)
        .limit(Number(rowslimit))
        .sort({ _id: -1 })
        .exec();
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
    try{
    const ExpenseId = req.params.id;
    const findexpense = await Expense.findOne({_id: ExpenseId});
    await findexpense.deleteOne();

    const totalexpense = Number(req.user.totalExpense)- Number(findexpense.expense);
    await req.user.updateOne({totalExpense: totalexpense});
    res.status(201).json('deleted');
    } 
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}