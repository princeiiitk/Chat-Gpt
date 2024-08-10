const mongoose = require('mongoose');
const User = require('../models/User');
const ChatMessage = require('../models/ChatMessage');
require('dotenv').config();

const seedDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Clear existing data
    await User.deleteMany({});
    await ChatMessage.deleteMany({});
    console.log('Existing data cleared');

    // Seed Users
    const users = [
      { username: 'user1', password: await bcrypt.hash('password1', 10) },
      { username: 'user2', password: await bcrypt.hash('password2', 10) },
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers);

    // Seed Chat Messages
    const chatMessages = [
      { text: 'Hello, world!', user: createdUsers[0]._id },
      { text: 'How are you?', user: createdUsers[1]._id },
    ];

    const createdMessages = await ChatMessage.insertMany(chatMessages);
    console.log('Chat messages seeded:', createdMessages);

    // Close the database connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();
