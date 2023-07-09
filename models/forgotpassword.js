const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForgotPasswordRequests = new Schema({
  isactive: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});
module.exports = mongoose.model("forgetpasswordrequests", ForgotPasswordRequests);