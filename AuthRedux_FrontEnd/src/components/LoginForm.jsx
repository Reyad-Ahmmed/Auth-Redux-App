import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5268/api/auth/login', {
        username,
        password,
      });
      const token = res.data.token;
      dispatch(setUser({ token, userInfo: { username } }));
      navigate('/account');
    } catch (err) {
      alert('Login failed: ' + err.response?.data);
    }
  };

  return (
    <div className="glass-login-container">
      <motion.div
        className="glass-login-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2>Login Form</h2>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
