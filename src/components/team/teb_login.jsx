import React, { useState, useEffect } from 'react';
import '../../styles/teb_login.css';
import { useAuth } from '../../contexts/AuthContext';

function TebLogin({ studentId }) {
  const { user } = useAuth(); // Dostop do prijavljenega uporabnika
  const [participate, setParticipate] = useState('no'); // Privzeto stanje je "ne"
  const [tournamentName, setTournamentName] = useState('');
  const [secondTournamentName, setSecondTournamentName] = useState(''); // Nova izbira za drugi turnir
  const [slogan, setSlogan] = useState('');
  const [tournaments, setTournaments] = useState([]);

  // Fetch tournaments from the server
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://lanparty.scv.si/api/tournaments');
        if (response.ok) {
          const data = await response.json();
          setTournaments(data);
          if (data.length > 0) {
            setTournamentName(data[0].name); // Set the first tournament as default
          }
        } else {
          console.error('Napaka pri pridobivanju turnirjev:', response.statusText);
        }
      } catch (error) {
        console.error('Napaka pri pridobivanju turnirjev:', error);
      }
    };

    fetchTournaments();
  }, []);

  const handleModalResponse = (response) => {
    setShowModal(false); // Skrij modal
    if (response === 'yes') {
      setIsEnabled(true); // Omogoči interakcije
    } else {
      setIsEnabled(false); // Onemogoči interakcije
    }
  };

  const handleSubmit = async () => {
    if (!participate) {
        alert('Prosim, izberi odgovor na vprašanje.');
        return;
    }

    try {
        const response = await fetch('https://lanparty.scv.si/api/solo-tournament', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_code: user?.user_code, // user_code prijavljenega uporabnika
                participate,
                tournament_name: tournamentName,
                second_tournament_name: participate === 'yes' ? secondTournamentName : null,
                slogan,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Napaka: ${errorData.message}`);
            return;
        }

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Napaka pri prijavi:', error);
        alert('Napaka pri prijavi.');
    }
};
  

  return (
    <div className="login-container">

      
      {/* Ime uporabnika na vrhu */}
      <div className="user-name">
        <h1 className="team-name">{user?.username || 'Uporabnik'}</h1>
      </div>

      <div className="content-container">
        {/* Levi del: vprašanje in izbira */}
        <div className="login-section">
          <h2>Ali boš sodeloval v večjih turnirjih?</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="participate"
                value="yes"
                onChange={(e) => setParticipate(e.target.value)}
              />
              Da
            </label>
            <label>
              <input
                type="radio"
                name="participate"
                value="no"
                defaultChecked // Privzeto označeno
                onChange={(e) => setParticipate(e.target.value)}
              />
              Ne
            </label>
          </div>
        </div>

        {/* Srednji del: izbira turnirja */}
        <div className="tournament-selection">
          <label className="label-select">Izberi turnir:</label>
          <br />
          <select
            className="tournament-select"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
          >
            <option value="" disabled>Izberite turnir</option>
            {tournaments.map((tournament) => (
              <option key={tournament.id} value={tournament.name}>
                {tournament.name}
              </option>
            ))}
          </select>

          {/* Druga izbira, če je izbran "Da" */}
          {participate === 'yes' && (
            <>
              <label className="label-select">Izberi še drugi turnir:</label>
              <br />
              <select
                className="tournament-select"
                value={secondTournamentName}
                onChange={(e) => setSecondTournamentName(e.target.value)}
              >
                {tournaments.map((tournament) => (
                  <option key={tournament.id} value={tournament.name}>
                    {tournament.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Desni del: slogan */}
        <div className="slogan-section">
          <label className="input-label">Slogan (ni obvezno)</label>
          <input
            type="text"
            className="input-field"
            placeholder="Calm under pressure"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
        </div>
      </div>

      {/* Gumb za shranjevanje */}
      <div className="button-section">
        <button className="save-button" onClick={handleSubmit}>
          Shrani
        </button>
      </div>
    </div>
  );
}

export default TebLogin;
