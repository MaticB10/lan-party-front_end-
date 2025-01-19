import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import TebTeam from './team/teb_team';
import TebRegisterTeam from './team/teb_register_team';
import TebLogin from './team/teb_login';
import TebInfo from './team/teb_info';
import subtract from '../image/subtract.png';
import '../styles/Team.css';

function Team() {
  const { user } = useAuth(); // Pridobimo informacije o prijavi
  const [selectedTab, setSelectedTab] = useState('team'); // Privzeti zavihek

  // Funkcija za prikaz vsebine na podlagi izbranega zavihka
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
      <div className="background-image">
        <img className="subtract" alt="Subtract" src={subtract} />
      </div>
      <div className="team-content">
        <div className="team-tab-content">{renderContent()}</div>
        <div className="team-actions">
          <button className="team-action-button" onClick={() => setSelectedTab('team')}>
            <FontAwesomeIcon icon={faUsers} className="fa-icon" />
            <span>Ekipa</span>
          </button>
          {user && (
            <>
              <button className="team-action-button" onClick={() => setSelectedTab('registerTeam')}>
                <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
                <span>Prijavi ekipo</span>
              </button>
              <button className="team-action-button" onClick={() => setSelectedTab('login')}>
                <FontAwesomeIcon icon={faUserPlus} className="fa-icon" />
                <span>Prijavi se</span>
              </button>
            </>
          )}
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
