const chatService = require('../services/chatService');

const chatController = {
  getAllMessages: async (req, res) => {
    try {
      const messages = await chatService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  addMessage: async (req, res) => {
    const { text, user } = req.body;
    try {
      const newMessage = await chatService.addMessage(text, user);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error adding message:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  getMessageById: async (req, res) => {
    const messageId = req.params.id;
    try {
      const message = await chatService.getMessageById(messageId);
      res.status(200).json(message);
    } catch (error) {
      console.error('Error fetching message by ID:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  updateMessage: async (req, res) => {
    const messageId = req.params.id;
    const { text } = req.body;
    try {
      const updatedMessage = await chatService.updateMessage(messageId, text);
      res.status(200).json(updatedMessage);
    } catch (error) {
      console.error('Error updating message:', error.message);
      res.status(500).json({ error: error.message });
    }
  },

  deleteMessage: async (req, res) => {
    const messageId = req.params.id;
    try {
      const deletedMessage = await chatService.deleteMessage(messageId);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error.message);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = chatController;
