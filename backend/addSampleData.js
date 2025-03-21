const mongoose = require('mongoose');
const Bus = require('./models/Bus');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const sampleBuses = [
  { busId: "23C", route: "Anna Nagar - Central", schedule: "08:00", status: "Running" },
  { busId: "19B", route: "T. Nagar - Koyambedu", schedule: "08:15", status: "Delayed" },
  { busId: "29A", route: "Perambur - Velachery", schedule: "08:30", status: "Running" },
  { busId: "54E", route: "Adyar - Tambaram", schedule: "08:45", status: "Running" },
  { busId: "102C", route: "Broadway - Kelambakkam", schedule: "09:00", status: "Delayed" },
];

const addData = async () => {
  try {
    await Bus.deleteMany(); // Clear existing data
    await Bus.insertMany(sampleBuses);
    console.log('Sample data added successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

addData();