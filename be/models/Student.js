const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: String,
  year: Number,
});

module.exports = mongoose.model('Student', studentSchema);
