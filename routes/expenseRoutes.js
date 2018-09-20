const mongoose = require('mongoose');
const Expense = mongoose.model('expenses');
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
  app.get('/api/expenses', requireLogin, async (req, res) => {
    const expenses = await Expense.find({ _category: req.query.categoryId });
    res.send(expenses);
  });

  app.post('/api/expense', requireLogin, async (req, res) => {
    const { title, amount, date, categoryId } = req.body;
    const expense = new Expense({ title, amount, date, _category: categoryId });
    try {
      await expense.save();
      res.send(expense._id);
    } catch (err) {
      res.send(err, req.user);
    }
  });

  app.get('/api/expenses/:expenseId', requireLogin, async (req, res) => {
    try {
      const expense = await Expense.findOne({ _id: req.params.expenseId });
      res.send(expense);
    } catch (err) {
      res.send(err);
    }
  });

  app.delete('/api/expenses/:expenseId', requireLogin, async (req, res) => {
    try {
      const expense = await Expense.findByIdAndRemove(req.params.expenseId);
      res.send(expense);
    } catch (err) {
      res.send(err);
    }
  });

  app.put('/api/expenses/:expenseId', requireLogin, async (req, res) => {
    try {
      const { title, amount, date } = req.body;
      const modifiedDate = Date.now();
      const expense = await Expense.findOneAndUpdate(
        { _id: req.params.expenseId },
        { $set: { title, amount, date, modifiedDate } },
        { new: true }
      );
      res.send(expense);
    } catch (err) {
      res.send(err);
    }
  });
};
