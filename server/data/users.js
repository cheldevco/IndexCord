const { v4: uuidv4 } = require('uuid');

// Default admin user - password: admin
// Hash generated with: node server/scripts/generateHash.js admin
let users = [
  {
    id: '1',
    username: 'admin',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password: admin
    email: 'admin@indexcord.com'
  }
];

function createUser({ username, password, email }) {
  const user = {
    id: uuidv4(),
    username,
    password,
    email: email || `${username}@indexcord.com`,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return user;
}

function getUserById(id) {
  return users.find(u => u.id === id);
}

function getUserByUsername(username) {
  return users.find(u => u.username === username);
}

function getAllUsers() {
  return users.map(u => ({ id: u.id, username: u.username, email: u.email }));
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getAllUsers
};

