const express = require('express');
const jwt = require('jsonwebtoken');
const { getServers, getServerById, createServer, addUserToServer } = require('../data/servers');
const { getUserById } = require('../data/users');

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

// Get all servers for user
router.get('/', authenticateToken, (req, res) => {
  const servers = getServers().filter(server => 
    server.members.includes(req.userId)
  );
  res.json(servers);
});

// Get server by ID
router.get('/:id', authenticateToken, (req, res) => {
  const server = getServerById(req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }
  
  if (!server.members.includes(req.userId)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  res.json(server);
});

// Create server
router.post('/', authenticateToken, (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Server name is required' });
  }

  const server = createServer({
    name,
    ownerId: req.userId,
    members: [req.userId]
  });

  res.status(201).json(server);
});

// Join server
router.post('/:id/join', authenticateToken, (req, res) => {
  const server = getServerById(req.params.id);
  if (!server) {
    return res.status(404).json({ error: 'Server not found' });
  }

  addUserToServer(req.params.id, req.userId);
  res.json({ message: 'Joined server successfully' });
});

module.exports = router;

