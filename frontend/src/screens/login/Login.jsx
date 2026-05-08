import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { signIn } from '../../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await signIn({
        email,
        password
      });

      const payload = response.data?.data || response.data || {};
      const token = response.data?.token || payload?.token;
      const id =  response.data?.id || payload?.user?.id || id; 
      const role = (response.data?.role || payload?.user?.role || "").toUpperCase();
      const loggedInEmail = response.data?.email || payload?.user?.email || email;

      if (!token) {
        throw new Error("Login response did not include token");
      }

      // Storing authentication and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('id', id);
      localStorage.setItem('username', loggedInEmail); // Storing email under 'username' key for compatibility with other components
      
      // Storing a parsed user object for more structured data access
      const userObject = { username: loggedInEmail, role: role, email: loggedInEmail };
      localStorage.setItem('user', JSON.stringify(userObject));
      
      // Storing email explicitly under 'email' key for direct access
      localStorage.setItem('email', loggedInEmail); 

      // Navigate based on user role
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please check your network connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="overlay">
          <h2>WELCOME TO</h2>
          <div className="logo-box">
            <div className="logo-icon">🟧</div>
            <h3>TASTY BITE'S</h3>
          </div>
          <p>Login securely and get access to your personalized dashboard with just one click.</p>
          <p className="copy">© 2025 Tasty Bite's. All rights reserved.</p>
        </div>
      </div>

      <div className="login-right">
        <div className="form-box">
          <div className="tab-header">
            <Link to="/signup" className="inactive-tab">Sign Up</Link>
            <span className="active-tab">Login</span>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <input
              type="email" // Input type for email
              placeholder="Email" // Placeholder text
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Login'}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

          <p className="login-note">
            Not registered? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;