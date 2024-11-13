import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import TebTeam from './team/teb_team';
import TebRegisterTeam from './team/teb_register_team';
import TebLogin from './team/teb_login';
import TebInfo from './team/teb_info';
import '../styles/Team.css';

function Team() {
  const [selectedTab, setSelectedTab] = useState('team'); // Default to 'team' tab

  // Function to render the selected component
  const renderContent = () => {
    switch (selectedTab) {
      case 'team':
        return <TebTeam />;
      case 'registerTeam':
        return <TebRegisterTeam />;
      case 'login':
        return <TebLogin />;
      case 'info':
        return <TebInfo />;
      default:
        return <TebTeam />;
    }
  };

  return (
    <div className="team-page">
      {/* Gradient Background Overlay */}
      <div className="team-overlay"></div>

      {/* Main Content Container */}
      <div className="team-content">
        {/* Render Selected Tab Content */}
        <div className="team-tab-content">
          {renderContent()}
        </div>

        {/* Action Buttons (Fixed Position) */}
        <div className="team-actions">
          <button className="team-action-button" onClick={() => setSelectedTab('team')}>
            <FontAwesomeIcon icon={faUsers} className="fa-icon" />
            <span>Ekipa</span>
          </button>
          <button className="team-action-button" onClick={() => setSelectedTab('registerTeam')}>
            <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
            <span>Prijavi ekipo</span>
          </button>
          <button className="team-action-button" onClick={() => setSelectedTab('login')}>
            <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
            <span>Prijavi se</span>
          </button>
          <button className="team-action-button" onClick={() => setSelectedTab('info')}>
            <FontAwesomeIcon icon={faInfoCircle} className="fa-icon" />
            <span>O dogodku</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
