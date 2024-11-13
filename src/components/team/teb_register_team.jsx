import React from 'react';
import '../../styles/teb_register_team.css';

function teb_register_team() {
  return (
    <div className="register-team-container">
      <div className="register-team-column">
        <label htmlFor="add-member">Dodaj člana</label>
        <input type="text" id="add-member" placeholder="Vnesite ime člana" />
        <ul className="team-members-list">
          <li>TURK KEN</li>
          <li>JAY RAM CELINŠČAK</li>
          <li>MATIC BASLE</li>
          <li>LUKA KOPUŠAR</li>
          <li>NEJA GOLČMAN</li>
        </ul>
        <button className="save-button">Shrani</button>
      </div>
      <div className="register-team-column">
        <h1>Crimson Vortex</h1>
        <label htmlFor="team-name">Ime ekipe</label>
        <input type="text" id="team-name" value="Crimson Vortex" readOnly />
        <label htmlFor="select-tournament">Izberi turnir:</label>
        <select id="select-tournament">
          <option value="valorant">Valorant</option>
          {/* Add more options as needed */}
        </select>
        <p>Ali boš sodeloval v drugih turnirjih?</p>
      </div>
    </div>
  );
}

export default teb_register_team;
