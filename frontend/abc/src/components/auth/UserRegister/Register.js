// src/components/auth/UserRegister/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3333/register', {
        name,
        email,
        password,
      });

      console.log(response.data); // Mensagem do backend

      // Adicione lógica adicional conforme necessário

    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
