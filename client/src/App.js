// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/login';
import Dashboard from './Pages/Dashboard/dashboard';
import GameBoard from './Pages/Game/gameboard';

function App() {
  const [user, setUser] = useState(null); // Assuming `user` is null when not logged in

  const handleLogin = (userData) => {
    // Set the user data upon successful login
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/gameboard" element={user ? <GameBoard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
