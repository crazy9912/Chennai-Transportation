const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new bus
router.post('/', async (req, res) => {
  const bus = new Bus({
    busId: req.body.busId,
    route: req.body.route,
    schedule: req.body.schedule,
    status: req.body.status,
  });

  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;