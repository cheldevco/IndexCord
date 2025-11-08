const jwt = require('jsonwebtoken');
const { addMessage, getMessages } = require('./data/messages');
const { getUserById } = require('./data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function initializeSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.userId;
      socket.username = decoded.username;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.username} (${socket.userId})`);
    
    // Join channel room
    socket.on('join_channel', (channelId) => {
      socket.leaveAll();
      socket.join(`channel:${channelId}`);
      console.log(`${socket.username} joined channel ${channelId}`);
    });

    // Leave channel
    socket.on('leave_channel', (channelId) => {
      socket.leave(`channel:${channelId}`);
      console.log(`${socket.username} left channel ${channelId}`);
    });

    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { channelId, content } = data;
        const message = {
          id: require('uuid').v4(),
          channelId,
          userId: socket.userId,
          username: socket.username,
          content,
          timestamp: new Date().toISOString()
        };

        addMessage(message);
        
        // Emit to all users in the channel
        io.to(`channel:${channelId}`).emit('new_message', message);
      } catch (error) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('typing_start', (data) => {
      socket.to(`channel:${data.channelId}`).emit('user_typing', {
        userId: socket.userId,
        username: socket.username,
        channelId: data.channelId
      });
    });

    socket.on('typing_stop', (data) => {
      socket.to(`channel:${data.channelId}`).emit('user_stopped_typing', {
        userId: socket.userId,
        channelId: data.channelId
      });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.username}`);
    });
  });
}

module.exports = { initializeSocket };

