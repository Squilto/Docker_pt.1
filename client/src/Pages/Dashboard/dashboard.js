// Dashboard.js
import React from 'react';
import './dashboard.css';

function Dashboard({ username, onGameSelect }) {
  return (
    <div className="dashboard-container">
      <div className="user-panel">
        <p>Welcome, <strong>{username}</strong>!</p>
        <button onClick={() => onGameSelect('history')}>Game History</button>
        <button onClick={() => onGameSelect('settings')}>Settings</button>
      </div>
      <div className="game-selection">
        <h2>Select Game Mode</h2>
        <button className="game-button" onClick={() => onGameSelect('bot')}>VS Bot</button>
        <button className="game-button" onClick={() => onGameSelect('online')}>VS Online</button>
      </div>
    </div>
  );
}

export default Dashboard;
