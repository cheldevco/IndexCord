import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      // В production используем тот же origin (nginx проксирует)
      // В development используем полный URL
      let socketUrl: string;
      if (process.env.REACT_APP_API_URL) {
        socketUrl = process.env.REACT_APP_API_URL;
      } else if (process.env.NODE_ENV === 'production') {
        socketUrl = window.location.origin;
      } else {
        socketUrl = 'http://localhost:5000';
      }
      
      const newSocket = io(socketUrl, {
        auth: { token }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
}

