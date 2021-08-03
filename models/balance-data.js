const mongoose = require("mongoose");

const balanceDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  amountReceived: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BalanceData", balanceDataSchema);
