const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req,res) =>{
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount" }}},
        ]);
        
        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});
        
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: { $sum: "$amount" }}},
        ]);
        
        const Last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now - 60*24*60*60*1000)},
        }).sort({ date: -1 });

        
    } catch (error) {
        
    }
}