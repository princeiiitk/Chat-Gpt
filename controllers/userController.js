const userService = require('../services/userService');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    try {
      const user = await userService.getUserById(userId);
      
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = await userService.createUser(username, password);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    try {
      const updatedUser = await userService.updateUser(userId, username, password);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    try {
      const deletedUser = await userService.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
