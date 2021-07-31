const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    fromPerson: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    toPerson: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
