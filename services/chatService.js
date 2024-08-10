const ChatMessage = require('../models/ChatMessage');

const chatService = {
  getAllMessages: async () => {
    try {
      const messages = await ChatMessage.find().populate('user', 'username');
      return messages;
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  },

  addMessage: async (text, user) => {
    try {
      const newMessage = new ChatMessage({ text, user });
      await newMessage.save();
      return newMessage;
    } catch (error) {
      throw new Error('Error adding message');
    }
  },

  getMessageById: async (id) => {
    try {
      const message = await ChatMessage.findById(id).populate('user', 'username');
      if (!message) {
        throw new Error('Message not found');
      }
      return message;
    } catch (error) {
      throw new Error('Error fetching message by ID');
    }
  },

  updateMessage: async (id, text) => {
    try {
      const updatedMessage = await ChatMessage.findByIdAndUpdate(id, { text }, { new: true });
      if (!updatedMessage) {
        throw new Error('Message not found');
      }
      return updatedMessage;
    } catch (error) {
      throw new Error('Error updating message');
    }
  },

  deleteMessage: async (id) => {
    try {
      const deletedMessage = await ChatMessage.findByIdAndDelete(id);
      if (!deletedMessage) {
        throw new Error('Message not found');
      }
      return deletedMessage;
    } catch (error) {
      throw new Error('Error deleting message');
    }
  }
};

module.exports = chatService;
