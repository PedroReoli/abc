// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login/Login';
import UserRegister from './components/pages/UserRegister/UserRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
