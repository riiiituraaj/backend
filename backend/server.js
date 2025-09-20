const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const chatbotRoutes = require('./routes/chatbot');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Achum Chatbot API is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});