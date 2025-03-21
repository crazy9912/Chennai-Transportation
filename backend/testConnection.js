const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log('Connection failed:', err);
  });