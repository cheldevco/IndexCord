const express = require('express');
const jwt = require('jsonwebtoken');
const { getServerById } = require('../data/servers');
const { getChannelsByServer, getChannelById, createChannel } = require('../data/channels');

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

// Get channels for a server
router.get('/server/:serverId', authenticateToken, (req, res) => {
  const server = getServerById(req.params.serverId);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }

  if (!server.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const channels = getChannelsByServer(req.params.serverId);
  res.json(channels);
});

// Get channel by ID
router.get('/:id', authenticateToken, (req, res) => {
  const channel = getChannelById(req.params.id);
  if (!channel) {
    return res.status(404).json({ error: 'Channel not found' });
  }

  const server = getServerById(channel.serverId);
  if (!server || !server.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(channel);
});

// Create channel
router.post('/', authenticateToken, (req, res) => {
  const { serverId, name, type = 'text' } = req.body;
  
  if (!serverId || !name) {
    return res.status(400).json({ error: 'Server ID and channel name are required' });
  }

  const server = getServerById(serverId);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }

  if (!server.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const channel = createChannel({ serverId, name, type });
  res.status(201).json(channel);
});

module.exports = router;

