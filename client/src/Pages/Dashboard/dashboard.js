// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard({ username }) {
  const navigate = useNavigate();

  const handleGameSelect = (gameType) => {
    // You might want to save the selected gameType in state if needed
    navigate('/gameboard'); // Navigate to the GameBoard page
  };

  return (
    <div className="dashboard-container">
      <div className="user-panel">
        <p>Welcome, {username}!</p>
        <button>Game History</button>
        <button>Settings</button>
      </div>
      <div className="game-selection">
        <h2>Select Game Mode</h2>
        <button className="game-button" onClick={() => handleGameSelect('vs-bot')}>VS Bot</button>
        <button className="game-button" onClick={() => handleGameSelect('vs-online')}>VS Online</button>
      </div>
    </div>
  );
}

export default Dashboard;
