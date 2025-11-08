const { v4: uuidv4 } = require('uuid');

let servers = [
  {
    id: '1',
    name: 'Welcome Server',
    ownerId: '1',
    members: ['1'],
    createdAt: new Date().toISOString()
  }
];

function createServer({ name, ownerId, members }) {
  const server = {
    id: uuidv4(),
    name,
    ownerId,
    members: members || [ownerId],
    createdAt: new Date().toISOString()
  };
  servers.push(server);
  return server;
}

function getServerById(id) {
  return servers.find(s => s.id === id);
}

function getServers() {
  return servers;
}

function addUserToServer(serverId, userId) {
  const server = getServerById(serverId);
  if (server && !server.members.includes(userId)) {
    server.members.push(userId);
  }
  return server;
}

module.exports = {
  createServer,
  getServerById,
  getServers,
  addUserToServer
};

