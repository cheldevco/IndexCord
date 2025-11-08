const express = require('express');
const jwt = require('jsonwebtoken');
const { getMessagesByChannel } = require('../data/messages');
const { getChannelById } = require('../data/channels');
const { getServerById } = require('../data/servers');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get messages for a channel
router.get('/channel/:channelId', authenticateToken, (req, res) => {
  const channel = getChannelById(req.params.channelId);
  if (!channel) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const server = getServerById(channel.serverId);
  if (!server || !server.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const messages = getMessagesByChannel(req.params.channelId);
  res.json(messages);
});

module.exports = router;

