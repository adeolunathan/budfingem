// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import authApi from '../api/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const loginData = { email, password };
      const response = await authApi.loginUser(loginData);
      const token = response.token; // Assuming JWT token is returned as 'token' in response

      // Store JWT token (e.g., in localStorage - for simplicity in this example)
      localStorage.setItem('budfin_jwt_token', token);

      // Redirect to profile page (replace with your actual routing logic)
      window.location.href = '/profile'; // Simple redirect for demonstration
      // In a real app, use React Router for navigation

    } catch (err: unknown) {
      console.error('Login failed:', err);
      
      // Type guard to safely access err.message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;