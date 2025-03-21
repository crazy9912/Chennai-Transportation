const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  route: { type: String, required: true },
  schedule: { type: String, required: true },
  status: { type: String, enum: ['Running', 'Delayed', 'Cancelled'], default: 'Running' },
});

module.exports = mongoose.model('Bus', busSchema);