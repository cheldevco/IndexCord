import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Channel {
  id: string;
  serverId: string;
  name: string;
  type: string;
}

interface Message {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
}

const ChatArea: React.FC<{ channel: Channel }> = ({ channel }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    if (socket) {
      socket.emit('join_channel', channel.id);
      socket.on('new_message', handleNewMessage);

      return () => {
        socket.emit('leave_channel', channel.id);
        socket.off('new_message', handleNewMessage);
      };
    }
  }, [channel.id, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages/channel/${channel.id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (newMessage: Message) => {
    if (newMessage.channelId === channel.id) {
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit('send_message', {
      channelId: channel.id,
      content: message.trim()
    });

    setMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-discord-gray">
        <div className="text-discord-text-muted">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-discord-gray">
      <div className="h-12 border-b border-discord-darkest px-4 flex items-center shadow-sm">
        <span className="text-discord-text-muted mr-2">#</span>
        <h2 className="text-white font-semibold text-sm">{channel.name}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3 group hover:bg-discord-lightgray px-2 py-1 rounded">
            <div className="w-10 h-10 bg-discord-blurple rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {msg.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline space-x-2">
                <span className="text-white font-semibold text-sm">{msg.username}</span>
                <span className="text-discord-text-muted text-xs">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div className="text-discord-text text-sm mt-0.5">{msg.content}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-discord-darkest">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="flex-1 px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white placeholder-discord-text-muted"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-2 bg-discord-blurple hover:bg-blue-600 text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;

