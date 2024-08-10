const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Define routes
router.get('/messages', chatController.getAllMessages);
router.post('/messages', chatController.addMessage);
router.get('/messages/:id', chatController.getMessageById);
router.put('/messages/:id', chatController.updateMessage);
router.delete('/messages/:id', chatController.deleteMessage);

module.exports = router;
