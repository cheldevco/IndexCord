import React, { useState } from 'react';
import ServerList from './ServerList';
import UserPanel from './UserPanel';

interface Server {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

interface User {
  id: string;
  username: string;
  email?: string;
}

interface SidebarProps {
  servers: Server[];
  selectedServer: Server | null;
  onSelectServer: (server: Server) => void;
  onCreateServer: (name: string) => void;
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  servers,
  selectedServer,
  onSelectServer,
  onCreateServer,
  user,
  onLogout
}) => {
  const [showCreateServer, setShowCreateServer] = useState(false);
  const [serverName, setServerName] = useState('');

  const handleCreateServer = () => {
    if (serverName.trim()) {
      onCreateServer(serverName.trim());
      setServerName('');
      setShowCreateServer(false);
    }
  };

  return (
    <div className="flex h-screen bg-discord-dark">
      <div className="w-16 bg-discord-darkest flex flex-col items-center py-3 space-y-2">
        <div className="w-12 h-12 bg-discord-blurple rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:rounded-2xl transition-all">
          IC
        </div>
        <div className="w-12 h-0.5 bg-discord-gray"></div>
        {servers.map((server) => (
          <div
            key={server.id}
            onClick={() => onSelectServer(server)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:rounded-2xl transition-all ${
              selectedServer?.id === server.id
                ? 'bg-discord-blurple rounded-2xl'
                : 'bg-discord-gray hover:bg-discord-blurple'
            }`}
            title={server.name}
          >
            {server.name.charAt(0).toUpperCase()}
          </div>
        ))}
        <button
          onClick={() => setShowCreateServer(true)}
          className="w-12 h-12 bg-discord-gray hover:bg-discord-green rounded-full flex items-center justify-center text-white text-2xl font-light cursor-pointer hover:rounded-2xl transition-all"
          title="Add Server"
        >
          +
        </button>
      </div>

      {showCreateServer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-gray p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Create Server</h2>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Server name"
              className="w-full px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCreateServer()}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCreateServer(false);
                  setServerName('');
                }}
                className="px-4 py-2 bg-discord-dark hover:bg-discord-lightgray text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateServer}
                className="px-4 py-2 bg-discord-blurple hover:bg-blue-600 text-white rounded transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-60 bg-discord-dark flex flex-col">
        <div className="h-12 border-b border-discord-darkest px-4 flex items-center shadow-sm">
          <h2 className="text-white font-semibold text-sm">
            {selectedServer?.name || 'Select a server'}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <ServerList
            servers={servers}
            selectedServer={selectedServer}
            onSelectServer={onSelectServer}
          />
        </div>
        <UserPanel user={user} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Sidebar;

