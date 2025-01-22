import React, { useState, useEffect } from 'react';
import '../../styles/teb_login.css';
import { useAuth } from '../../contexts/AuthContext';

function TebLogin({ studentId }) {
  const { user } = useAuth();
  const [participate, setParticipate] = useState('no');
  const [tournamentName, setTournamentName] = useState('');
  const [secondTournamentName, setSecondTournamentName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [existingData, setExistingData] = useState(null); // Stanje za obstoječe podatke

  // Fetch tournaments from the server
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://lanparty.scv.si/api/sol_tournaments');
        if (response.ok) {
          const data = await response.json();
          setTournaments(data);
          if (data.length > 0) {
            setTournamentName(data[0].name);
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

  // Fetch existing data from the server
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await fetch(`https://lanparty.scv.si/api/solo-tournament/${user.user_code}`);
        if (response.ok) {
          const data = await response.json();
          setExistingData(data);
          // Nastavi obstoječe vrednosti
          setParticipate(data.participate);
          setTournamentName(data.tournament_name);
          setSecondTournamentName(data.second_tournament_name || '');
          setSlogan(data.slogan || '');
        } else if (response.status === 404) {
          console.log('Ni obstoječih podatkov za uporabnika.');
        } else {
          console.error('Napaka pri pridobivanju podatkov:', response.statusText);
        }
      } catch (error) {
        console.error('Napaka pri pridobivanju podatkov:', error);
      }
    };

    fetchExistingData();
  }, [user.user_code]);

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
          user_code: user.user_code,
          participate,
          tournament_name: tournamentName,
          second_tournament_name: participate === 'yes' ? secondTournamentName : null,
          slogan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Napaka:', data.message);
        alert(`Napaka: ${data.message}`);
        return;
      }

      alert(data.message); // Prikaži uspešno sporočilo glede na API
    } catch (error) {
      console.error('Napaka:', error);
      alert('Prišlo je do napake pri shranjevanju ali posodabljanju podatkov.');
    }
  };

  const handleOdjava = async () => {
    if (!window.confirm('Ali ste prepričani, da se želite odjaviti iz turnirja?')) return;

    try {
        const response = await fetch(`https://lanparty.scv.si/api/solo-tournament/${user.user_code}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Napaka:', data.message);
            alert(`Napaka: ${data.message}`);
            return;
        }

        // Počisti podatke po uspešni odjavi
        setParticipate('no');
        setTournamentName('');
        setSecondTournamentName('');
        setSlogan('');
        setExistingData(null);

        alert(data.message);
    } catch (error) {
        console.error('Napaka pri odjavi:', error);
        alert('Prišlo je do napake pri odjavi iz turnirja.');
    }
};


  return (
    <div className="login-container">
      <div className="user-name">
        <h1 className="team-name">{user?.username || 'Uporabnik'}</h1>
      </div>

      <div className="content-container">
        <div className="login-section">
          <h2>Ali boš sodeloval v večjih turnirjih?</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="participate"
                value="yes"
                checked={participate === 'yes'}
                onChange={(e) => setParticipate(e.target.value)}
              />
              Da
            </label>
            <label>
              <input
                type="radio"
                name="participate"
                value="no"
                checked={participate === 'no'}
                onChange={(e) => setParticipate(e.target.value)}
              />
              Ne
            </label>
          </div>
        </div>

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

        <div className="slogan-section">
          <label className="input-label">Slogan (ni obvezno)</label>
          <input
            type="register-text"
            className="input-field"
            placeholder="Calm under pressure"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
        </div>
      </div>

      <div className="button-section">
        <button className="save-button" onClick={handleSubmit}>
          Shrani
        </button>
        <button className="save-button" onClick={handleOdjava}>
          Odjavi iz turnerja
        </button>
      </div>
    </div>
  );
}

export default TebLogin;
