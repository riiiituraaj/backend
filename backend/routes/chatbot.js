const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbot');

// Route for handling chatbot messages based on mood
router.post('/message', chatbotController.processMessage);

// Routes for specific moods
router.post('/happy', chatbotController.happyMood);
router.post('/sad', chatbotController.sadMood);
router.post('/angry', chatbotController.angryMood);

module.exports = router;