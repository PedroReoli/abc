// src/components/auth/Login/Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3333/login', {
        email,
        password,
      });

      console.log(response.data); // Mensagem do backend

      // Se o login for bem-sucedido, redirecione para a página desejada
      if (response.status === 200) {
        history.push('/dashboard'); // Substitua '/dashboard' pelo caminho desejado
      }

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Não tem cadastro? <Link to="/register">Crie uma conta</Link></p>
    </div>
  );
};

export default Login;
