const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, default: 'incomplete' }, // Default status
});

module.exports = mongoose.model('Todo', todoSchema);
