// Streak.js
import React from 'react';
import './Streak.css'; // Import the corresponding CSS file for styles

const Streak = ({ days }) => {
  return (
    <div className="streak-container">
      <div className="streak-badge">
        <span className="streak-text">Daily Streak</span>
        <span className="streak-count">{days}</span>
      </div>
    </div>
  );
};

export default Streak;
