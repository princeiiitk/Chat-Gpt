const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://pspkssm7:prince123@cluster0.o493qml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
