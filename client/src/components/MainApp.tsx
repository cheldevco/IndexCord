import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ChannelView from './Channel/ChannelView';
import { useAuth } from '../contexts/AuthContext';
import { SocketProvider } from '../contexts/SocketContext';
import axios from 'axios';

// В production используем относительный путь (nginx проксирует)
// В development используем полный URL
const API_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

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

const MainApp: React.FC = () => {
  const { user, logout } = useAuth();
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServers();
  }, []);

  useEffect(() => {
    if (selectedServer) {
      fetchChannels(selectedServer.id);
    }
  }, [selectedServer]);

  const fetchServers = async () => {
    try {
      const response = await axios.get(`${API_URL}/servers`);
      const serverList = response.data;
      setServers(serverList);
      if (serverList.length > 0) {
        setSelectedServer(serverList[0]);
      }
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannels = async (serverId: string) => {
    try {
      const response = await axios.get(`${API_URL}/channels/server/${serverId}`);
      setChannels(response.data);
      if (response.data.length > 0) {
        setSelectedChannel(response.data[0]);
      } else {
        setSelectedChannel(null);
      }
    } catch (error) {
      console.error('Failed to fetch channels:', error);
    }
  };

  const handleCreateServer = async (name: string) => {
    try {
      const response = await axios.post(`${API_URL}/servers`, { name });
      setServers([...servers, response.data]);
      setSelectedServer(response.data);
    } catch (error) {
      console.error('Failed to create server:', error);
    }
  };

  const handleCreateChannel = async (name: string) => {
    if (!selectedServer) return;
    try {
      const response = await axios.post(`${API_URL}/channels`, {
        serverId: selectedServer.id,
        name
      });
      setChannels([...channels, response.data]);
      setSelectedChannel(response.data);
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-discord-dark">
        <div className="text-discord-text">Loading...</div>
      </div>
    );
  }

  return (
    <SocketProvider>
      <div className="flex h-screen bg-discord-gray overflow-hidden">
        <Sidebar
          servers={servers}
          selectedServer={selectedServer}
          onSelectServer={setSelectedServer}
          onCreateServer={handleCreateServer}
          user={user}
          onLogout={logout}
        />
        {selectedServer && (
          <ChannelView
            server={selectedServer}
            channels={channels}
            selectedChannel={selectedChannel}
            onSelectChannel={setSelectedChannel}
            onCreateChannel={handleCreateChannel}
          />
        )}
      </div>
    </SocketProvider>
  );
};

export default MainApp;

