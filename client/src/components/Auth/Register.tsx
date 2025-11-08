import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(username, password, email || undefined);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-discord-dark">
      <div className="w-full max-w-md p-8 bg-discord-gray rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">IndexCord</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-discord-text-muted mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-discord-text-muted mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-discord-text-muted mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-discord-dark border border-discord-lightgray rounded focus:outline-none focus:border-discord-blurple text-white"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-discord-blurple hover:bg-blue-600 text-white font-medium rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-discord-text-muted text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-discord-blurple hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

