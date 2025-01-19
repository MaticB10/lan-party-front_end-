import React from 'react';
import '../../styles/TebInfo.css';

function teb_info() {
  return (
    <div className="info-container">
      <h1 className="info-heading">O dogodku</h1>
      
      <div className="info-content">
        <p className="info-highlight">
          🎮 <strong>Pripravljeni na največji gaming dogodek leta!</strong> 🎮
        </p>
        <p>
          V samo dveh dneh bomo gostili dva velika glavna turnirja in več manjših turnirjev, ki jih ne smete zamuditi! Pridruži se nam na Lan Partiju 2025 in pokaži svoje spretnosti v priljubljenih igrah!
        </p>
        <p>
          <strong>Glavna turnirja:</strong> <span className="highlight">CSGO, League of Legends</span><br />
          <strong>Manjši turnirji:</strong> <span className="highlight">Rocket League, FC25, Fortnite</span>!
        </p>
      </div>
    </div>
  );
}

export default teb_info;
