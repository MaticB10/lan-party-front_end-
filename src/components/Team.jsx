import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faInfoCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import TebTeam from './team/teb_team';
import TebRegisterTeam from './team/teb_register_team';
import TebLogin from './team/teb_login';
import TebInfo from './team/teb_info';
import '../styles/Team.css';

function Team() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('team');

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
      {/* Heading Section */}
      <div className="top-heading">
        <div className="heading-text">
          <h1 className="heading-title">TEAMS & TOURNAMENTS</h1>
          <p className="heading-subtitle">
            Upravljanje ekip, prijave na turnirje in podrobne informacije o Lan Partyju 2025.
          </p>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="team-main">
        <nav className="team-nav">
          <button
            className={`nav-button ${selectedTab === 'team' ? 'active' : ''}`}
            onClick={() => setSelectedTab('team')}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Nabor ekip</span>
          </button>

          {user && (
            <div className="nav-dropdown">
              <button
                className={`nav-button ${
                  selectedTab === 'registerTeam' || selectedTab === 'login' ? 'active' : ''
                }`}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Prijava na turnerje</span>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
              </button>
              <div className="dropdown-content">
                <button onClick={() => setSelectedTab('registerTeam')}>
                  Prijavi ekipo
                </button>
                <button onClick={() => setSelectedTab('login')}>
                  Solo prijava
                </button>
              </div>
            </div>
          )}

          <button
            className={`nav-button ${selectedTab === 'info' ? 'active' : ''}`}
            onClick={() => setSelectedTab('info')}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>O dogodku</span>
          </button>
        </nav>

        <div className="content-card">{renderContent()}</div>
      </div>
    </div>
  );
}

export default Team;
