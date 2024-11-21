import React, { useState, useEffect } from 'react';
import '../../styles/teb_register_team.css';

function TebRegisterTeam() {
  const [tournaments, setTournaments] = useState([]); // Shrani seznam turnirjev iz baze
  const [selectedTournament, setSelectedTournament] = useState(''); // Shrani izbran turnir

  // Pridobi turnirje s statusom "active" iz API-ja ob prvem nalaganju komponente
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('http://localhost:8081/tournaments'); // Prepričajte se, da je endpoint pravilen
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Napaka pri pridobivanju turnirjev:", error);
      }
    };

    fetchTournaments();
  }, []);

  // Funkcija za obravnavo izbire turnirja
  const handleTournamentSelect = (event) => {
    setSelectedTournament(event.target.value);
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
        <input type="text" id="team-name" placeholder="Vnesite ime ekipe" />
        <label htmlFor="select-tournament">Izberi turnir:</label>
        <select id="select-tournament" value={selectedTournament} onChange={handleTournamentSelect}>
          <option value="" disabled>Izberite turnir</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TebRegisterTeam;
