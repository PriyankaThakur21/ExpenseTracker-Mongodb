const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Expense = new Schema({
  expense: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("expenses", Expense);