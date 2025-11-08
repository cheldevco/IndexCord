let messages = [
  {
    id: '1',
    channelId: '1',
    userId: '1',
    username: 'admin',
    content: 'Welcome to IndexCord! 🎉',
    timestamp: new Date().toISOString()
  }
];

function addMessage(message) {
  messages.push(message);
  return message;
}

function getMessagesByChannel(channelId) {
  return messages.filter(m => m.channelId === channelId);
}

function getMessageById(id) {
  return messages.find(m => m.id === id);
}

module.exports = {
  addMessage,
  getMessagesByChannel,
  getMessageById
};

