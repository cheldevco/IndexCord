import React from 'react';

interface Server {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

interface ServerListProps {
  servers: Server[];
  selectedServer: Server | null;
  onSelectServer: (server: Server) => void;
}

const ServerList: React.FC<ServerListProps> = ({ servers, selectedServer, onSelectServer }) => {
  return (
    <div className="space-y-1">
      {servers.map((server) => (
        <div
          key={server.id}
          onClick={() => onSelectServer(server)}
          className={`px-2 py-1.5 rounded cursor-pointer transition-colors ${
            selectedServer?.id === server.id
              ? 'bg-discord-lightgray'
              : 'hover:bg-discord-lightgray'
          }`}
        >
          <div className="text-discord-text text-sm font-medium">{server.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ServerList;

