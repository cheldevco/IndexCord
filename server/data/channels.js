const { v4: uuidv4 } = require('uuid');

let channels = [
  {
    id: '1',
    serverId: '1',
    name: 'general',
    type: 'text',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    serverId: '1',
    name: 'random',
    type: 'text',
    createdAt: new Date().toISOString()
  }
];

function createChannel({ serverId, name, type = 'text' }) {
  const channel = {
    id: uuidv4(),
    serverId,
    name,
    type,
    createdAt: new Date().toISOString()
  };
  channels.push(channel);
  return channel;
}

function getChannelById(id) {
  return channels.find(c => c.id === id);
}

function getChannelsByServer(serverId) {
  return channels.filter(c => c.serverId === serverId);
}

module.exports = {
  createChannel,
  getChannelById,
  getChannelsByServer
};

