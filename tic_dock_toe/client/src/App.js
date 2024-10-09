// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/login'; // Assuming the Login component is in /pages/Login.js
import Dashboard from './Pages/Dashboard/dashboard'; // Updated to point to the new Dashboard

function App() {
  const [user, setUser] = useState(null); // Replace with real authentication logic

  const handleLogin = (userData) => {
    // Handle login logic and set the user
    setUser(userData.username);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard username={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
