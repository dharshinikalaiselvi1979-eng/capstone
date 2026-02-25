const router = require("express").Router();
const Expense = require("../models/Expense");

router.get("/:userId", async (req, res) => {
  const expenses = await Expense.find({ userId: req.params.userId });
  res.json(expenses);
});

router.post("/", async (req, res) => {
  await Expense.create(req.body);
  res.send("Expense Added");
});

module.exports = router;
