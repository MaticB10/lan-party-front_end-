import React from 'react';
import '../../styles/teb_login.css';

function teb_login() {
  return (
    <div className="login-container">
      <div className="login-section">
        <h2>Ali boš sodeloval v drugih turnirjih?</h2>
        <div className="radio-group">
          <label>
            <input type="radio" name="participate" value="yes" />
            Da
          </label>
          <label>
            <input type="radio" name="participate" value="no" />
            Ne
          </label>
        </div>

        <label className="label-select">Izberi turnir:</label>
        <select className="tournament-select">
          <option>Rocket League</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="login-info">
        <h1 className="team-name">Kentooo6</h1>
        
        <label className="input-label">Ime</label>
        <input type="text" className="input-field" value="Kentooo6" readOnly />

        <label className="input-label">Slogan (ni obvezno)</label>
        <input type="text" className="input-field" placeholder="Calm under pressure" />
      </div>

      <button className="save-button">Shrani</button>
    </div>
  );
}

export default teb_login;
