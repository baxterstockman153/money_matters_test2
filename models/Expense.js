const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  title: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: 'amount cannot be blank!'
  },
  date:{
    type:Date,
    default: Date.now
  },
  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: 'Category has to be provided!'
  }
});

mongoose.model('expenses', expenseSchema);
