import React, { useState } from 'react';
import ChannelList from './ChannelList';
import ChatArea from './ChatArea';

interface Server {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

interface Channel {
  id: string;
  serverId: string;
  name: string;
  type: string;
}

interface ChannelViewProps {
  server: Server;
  channels: Channel[];
  selectedChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
  onCreateChannel: (name: string) => void;
}

const ChannelView: React.FC<ChannelViewProps> = ({
  server,
  channels,
  selectedChannel,
  onSelectChannel,
  onCreateChannel
}) => {
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [channelName, setChannelName] = useState('');

  const handleCreateChannel = () => {
    if (channelName.trim()) {
      onCreateChannel(channelName.trim());
      setChannelName('');
      setShowCreateChannel(false);
    }
  };

  return (
    <div className="flex flex-1 h-screen">
      <div className="w-60 bg-discord-dark flex flex-col">
        <div className="h-12 border-b border-discord-darkest px-4 flex items-center shadow-sm">
          <h2 className="text-white font-semibold text-sm">{server.name}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="px-2 py-1">
            <div className="text-discord-text-muted text-xs font-semibold uppercase mb-1">
              Text Channels
            </div>
            <ChannelList
              channels={channels}
              selectedChannel={selectedChannel}
              onSelectChannel={onSelectChannel}
            />
            <button
              onClick={() => setShowCreateChannel(true)}
              className="w-full mt-2 px-2 py-1 text-discord-text-muted hover:text-discord-text hover:bg-discord-lightgray rounded text-sm transition-colors text-left"
            >
              + Create Channel
            </button>
          </div>
        </div>
      </div>

      {showCreateChannel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-discord-gray p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Create Channel</h2>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Channel name"
              className="w-full px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleCreateChannel()}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCreateChannel(false);
                  setChannelName('');
                }}
                className="px-4 py-2 bg-discord-dark hover:bg-discord-lightgray text-white rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateChannel}
                className="px-4 py-2 bg-discord-blurple hover:bg-blue-600 text-white rounded transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedChannel ? (
        <ChatArea channel={selectedChannel} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-discord-gray">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-discord-text-muted mb-2">
              Welcome to {server.name}!
            </h3>
            <p className="text-discord-text-muted">
              Select a channel to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelView;

