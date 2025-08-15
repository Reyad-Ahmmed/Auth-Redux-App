import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../css/RegisterPage.css'; // We'll create this CSS file
import { useNavigate } from 'react-router-dom'; 

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // ✅ Initialize navigate

  
  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5268/api/auth/register', form);
      alert('Registration successful! You can now log in.');
      navigate('/login'); // Navigate to login page
    } catch (err) {
      alert('Registration failed: ' + err.response?.data);
    }
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Registration Form
        </motion.h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          placeholder="First Name"
          onChange={e => setForm({ ...form, firstname: e.target.value })}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          placeholder="Last Name"
          onChange={e => setForm({ ...form, lastname: e.target.value })}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegister}
        >
          Register
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
