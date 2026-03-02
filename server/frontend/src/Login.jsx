// frontend/src/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Normally you would check credentials via API
    navigate('/dashboard');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" required /><br/><br/>
        <input type="password" placeholder="Password" required /><br/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}