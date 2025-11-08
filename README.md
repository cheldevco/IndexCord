# IndexCord

Discord-like chat application built with React, Node.js, Express, and Socket.io.

## Features

- 🔐 User authentication (register/login)
- 🏠 Server management (create/join servers)
- channel management (create text channels)
- 💬 Real-time messaging with Socket.io
- 🎨 Modern Discord-like UI with Tailwind CSS

## Tech Stack

### Backend
- Node.js + Express
- Socket.io for real-time communication
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Socket.io-client for real-time updates
- Axios for API calls

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or install all at once:
```bash
npm run install-all
```

## Running the Application

### Using Docker (Recommended)

**Production:**
```bash
docker-compose up -d
```

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Development Mode (Local)

Run both server and client concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend:**
```bash
npm run server
```

**Frontend:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Default Credentials

You can register a new account or use the default admin account:
- Username: `admin`
- Password: `admin`

## Project Structure

```
IndexCord/
├── server/
│   ├── index.js          # Main server file
│   ├── socket.js         # Socket.io configuration
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── servers.js
│   │   ├── channels.js
│   │   └── messages.js
│   └── data/             # In-memory data storage
│       ├── users.js
│       ├── servers.js
│       ├── channels.js
│       └── messages.js
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   └── App.tsx
│   └── public/
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Servers
- `GET /api/servers` - Get user's servers
- `GET /api/servers/:id` - Get server by ID
- `POST /api/servers` - Create new server
- `POST /api/servers/:id/join` - Join server

### Channels
- `GET /api/channels/server/:serverId` - Get channels for server
- `GET /api/channels/:id` - Get channel by ID
- `POST /api/channels` - Create new channel

### Messages
- `GET /api/messages/channel/:channelId` - Get messages for channel

## Socket Events

### Client → Server
- `join_channel` - Join a channel room
- `leave_channel` - Leave a channel room
- `send_message` - Send a message
- `typing_start` - User started typing
- `typing_stop` - User stopped typing

### Server → Client
- `new_message` - New message received
- `user_typing` - User is typing
- `user_stopped_typing` - User stopped typing

## Docker

### Production Build

Build and run with docker-compose:
```bash
docker-compose up -d --build
```

Stop containers:
```bash
docker-compose down
```

### Development Build

Run in development mode with hot reload:
```bash
docker-compose -f docker-compose.dev.yml up
```

### Environment Variables

Create a `.env` file for production:
```env
JWT_SECRET=your-secret-key-change-in-production
```

### Docker Files

- `Dockerfile` - Single container build (all-in-one)
- `Dockerfile.backend` - Backend only
- `Dockerfile.frontend` - Frontend only (with nginx)
- `Dockerfile.dev` - Development build
- `docker-compose.yml` - Production setup (separate services)
- `docker-compose.dev.yml` - Development setup

## Notes

- Data is stored in-memory and will be lost on server restart
- For production, consider using a database (MongoDB, PostgreSQL, etc.)
- Change the JWT_SECRET in production
- Add proper error handling and validation
- Implement rate limiting
- Add file upload support
- Add voice channels
- Add user roles and permissions

## License

MIT

