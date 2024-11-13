import React, { useState, useEffect } from 'react';
import '../../styles/teb_register_team.css';

function TebRegisterTeam() {
  const [games, setGames] = useState([]); // Shrani seznam iger iz baze
  const [selectedGame, setSelectedGame] = useState(''); // Shrani izbrano igro

  // Pridobi igre s tournament_type = 1 iz API-ja ob prvem nalaganju komponente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8081/games');
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Napaka pri pridobivanju iger:", error);
      }
    };

    fetchGames();
  }, []);

  // Funkcija za obravnavo izbire igre
  const handleGameSelect = (event) => {
    setSelectedGame(event.target.value);
  };

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
        <h1>Prijavi Ekipo</h1>
        <label htmlFor="team-name">Ime ekipe</label>
        <input type="text" id="team-name" value="Ime ekipe" readOnly />
        <label htmlFor="select-tournament">Izberi turnir:</label>
        <select id="select-tournament" value={selectedGame} onChange={handleGameSelect}>
          <option value="" disabled>Izberite igro</option>
          {games.map((game) => (
            <option key={game.id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TebRegisterTeam;
