const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: 'Name cannot be blank!'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    default: Date.now
  },
  totalAmount: { type: mongoose.Schema.Types.ObjectId, ref: 'expenses' },
  // totalAmount: {
  //   type: Number,
  //   default: 0
  // },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User has to be logged in!'
  }
});

mongoose.model('categories', categorySchema);
