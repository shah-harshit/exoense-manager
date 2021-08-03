const router = require("express").Router();
const path = require("path");
const BalanceData = require(path.join(__dirname, "../models/balance-data"));

// Add transaction
router.post("/balance", async (req, res) => {
  const { name, amountPaid, amountReceived, balance } = req.body;

  try {
    const transaction = new BalanceData({
      name,
      amountPaid,
      amountReceived,
      balance,
    });
    if (!name || !amountPaid || !amountReceived || !balance) {
      return res.status(400).json({ message: "Could not update balance" });
    }
    await transaction.save();
    return res.status(201).json({ message: "balance updated" });
  } catch (error) {
    console.log(error);
  }
});

// Get all transactions
router.get("/balance", async (req, res) => {
  try {
    const balanceData = await BalanceData.find();
    res.json(balanceData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
