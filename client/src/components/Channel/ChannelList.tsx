import React from 'react';

interface Channel {
  id: string;
  serverId: string;
  name: string;
  type: string;
}

interface ChannelListProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  onSelectChannel
}) => {
  return (
    <div className="space-y-1">
      {channels.map((channel) => (
        <div
          key={channel.id}
          onClick={() => onSelectChannel(channel)}
          className={`px-2 py-1.5 rounded cursor-pointer transition-colors flex items-center ${
            selectedChannel?.id === channel.id
              ? 'bg-discord-lightgray'
              : 'hover:bg-discord-lightgray'
          }`}
        >
          <span className="text-discord-text-muted mr-2">#</span>
          <span className="text-discord-text text-sm font-medium">{channel.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;

