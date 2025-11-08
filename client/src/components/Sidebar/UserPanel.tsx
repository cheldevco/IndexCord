import React, { useState } from 'react';

interface User {
  id: string;
  username: string;
  email?: string;
}

interface UserPanelProps {
  user: User | null;
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="h-14 bg-discord-darkest px-2 flex items-center relative">
      <div
        className="flex items-center space-x-2 w-full px-2 py-1.5 rounded cursor-pointer hover:bg-discord-lightgray transition-colors"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="w-8 h-8 bg-discord-blurple rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user?.username.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-discord-text text-sm font-medium truncate">
            {user?.username || 'User'}
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="absolute bottom-16 left-2 bg-discord-gray w-56 rounded shadow-lg border border-discord-darkest z-50">
          <div className="p-2 border-b border-discord-darkest">
            <div className="text-discord-text text-sm font-medium">{user?.username}</div>
            <div className="text-discord-text-muted text-xs">{user?.email || 'No email'}</div>
          </div>
          <button
            onClick={() => {
              onLogout();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-discord-lightgray text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPanel;

