const router = require("express").Router();
const path = require("path");
const Transactions = require(path.join(__dirname, "../models/transactions"));

// Add transaction
router.post("/", async (req, res) => {
  const { date, fromPerson, amount, toPerson, reason } = req.body;

  try {
    const transaction = new Transactions({
      date,
      fromPerson,
      amount,
      toPerson,
      reason,
    });
    if (!date || !fromPerson || !amount || !toPerson) {
      return res.status(400).json({ message: "Please enter all details" });
    }
    await transaction.save();
    return res.status(201).json({ message: "Added" });
  } catch (error) {
    console.log(error);
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transactions.find();
    res.json(transactions);
  } catch (error) {
    console.log(error);
  }
});

// delete transaction
router.delete("/delete", (req, res) => {
  const { id } = req.body;

  Transactions.deleteOne(
    {
      _id: id,
    },
    (err) => {
      if (err) return res.status(400).json({ message: "Something went wrong" });
      /* res.status(200).send(); */
      res.status(200).json({ message: "Deleted" });
    }
  );
});

module.exports = router;
