const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'YOUR_JWT_SECRET');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Get chat history (you can implement database storage for messages later)
router.get('/history', auth, async (req, res) => {
  try {
    // For now, return empty array as we're using socket.io for real-time messages
    res.send([]);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;