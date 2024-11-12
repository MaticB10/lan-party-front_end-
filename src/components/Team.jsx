import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Team.css';

function Team() {
  return (
    <div className="team-page">
      {/* Gradient Background Overlay */}
      <div className="team-overlay"></div>

      {/* Main Content Container */}
      <div className="team-content">
        
        {/* Heading */}
        <h1 className="team-heading">Ekipe</h1>
        
        
        {/* Team Groups */}
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

        {/* Action Buttons */}
        <div className="team-actions">
          <button className="team-action-button">
            <FontAwesomeIcon icon={faUsers} className="fa-icon" />
            <span>Ekipa</span>
          </button>
          <button className="team-action-button">
            <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
            <span>Prijavi ekipo</span>
          </button>
          <button className="team-action-button">
            <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
            <span>Prijavi se</span>
          </button>
          <button className="team-action-button">
            <FontAwesomeIcon icon={faInfoCircle} className="fa-icon" />
            <span>O dogodku</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
