import React from 'react';
import '../../styles/TebTeam.css';

function teb_team() {
  return (
    <div className="team-container">
      {/* Title at the top */}
      <h1 className="team-title">Ekipe</h1>
      
      <div className="team-groups">
        <div className="team-group">
          <h2>Ekipa 1 - 5</h2>
          <ul>
            <li>Shadow Strikers</li>
            <li>Crimson Vortex</li>
            <li>Phantom Squad</li>
            <li>Venomous Reapers</li>
            <li>Blaze Battalion</li>
          </ul>
        </div>

        <div className="team-group">
          <h2>Ekipa 5 - 10</h2>
          <ul>
            <li>Titan Fury</li>
            <li>Eclipse Guardians</li>
            <li>Iron Wolves</li>
            <li>Nebula Raiders</li>
            <li>Quantum Force</li>
          </ul>
        </div>

        <div className="team-group">
          <h2>Ekipa 10 - 15</h2>
          <ul>
            <li>Titan Fury</li>
            <li>Eclipse Guardians</li>
            <li>Iron Wolves</li>
            <li>Nebula Raiders</li>
            <li>Quantum Force</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default teb_team;
