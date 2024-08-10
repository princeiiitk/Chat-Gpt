const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userService = {
 

  getAllUsers: async () => {
    try {
      const users = await User.find();
    
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  },

  getUserById: async (id) => {
  
    try  {
    console.log(`Received ID: "${id}"`);
      
    const user = await User.findById(id);
    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }
    console.log('User found:', user); // Log user details
    return user;
  } catch (error) {
      throw new Error('Error fetching user by ID');
    }
  },

  createUser: async (username, password) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error('Error creating user');
    }
  },

  updateUser: async (id, username, password) => {
    try {
      let updateData = { username };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user');
    }
  },

  deleteUser: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error('User not found');
      }
      return deletedUser;
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
};

module.exports = userService;
