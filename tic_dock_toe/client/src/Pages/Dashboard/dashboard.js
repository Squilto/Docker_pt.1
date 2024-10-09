import React from 'react';
import './dashboard.css'; // Assuming you will have some CSS styles for Dashboard

function Dashboard({ username }) {
  return (
    <div className="dashboard-container">
      <div className="user-panel">
        <p>Welcome, {username}!</p>
        <button>Game History</button>
        <button>Settings</button>
      </div>
      <div className="game-selection">
        <h2>Select Game Mode</h2>
        <button className="game-button">VS Bot</button>
        <button className="game-button">VS Online</button>
      </div>
    </div>
  );
}

export default Dashboard;
