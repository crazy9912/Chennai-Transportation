const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chennai-ctc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const busSchema = new mongoose.Schema({
  route: String,
  busId: String,
  schedule: String,
  status: String,
});

const Bus = mongoose.model('Bus', busSchema);

// API to get all buses
app.get('/api/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});