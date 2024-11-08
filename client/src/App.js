// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/login';
import Dashboard from './Pages/Dashboard/dashboard';
import GameBoard from './Pages/Game/gameboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard username={user.username} /> : <Navigate to="/" />}
        />
        <Route path="/gameboard" element={user ? <GameBoard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
