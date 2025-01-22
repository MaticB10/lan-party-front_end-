import React, { useState, useEffect } from 'react';
import '../../styles/teb_register_team.css';
import { useAuth } from '../../contexts/AuthContext';

function TebRegisterTeam() {
  const { user } = useAuth();
  const [team, setTeam] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [memberCode, setMemberCode] = useState('');
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('');

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`https://lanparty.scv.si/api/team-by-user/${user.user_code}`);
        if (!response.ok) {
          if (response.status === 404) {
            console.log('Uporabnik še ni član nobene ekipe.');
            setShowModal(true); // Prikaži modal, če ni član ekipe
            return;
          }
          throw new Error('Napaka pri pridobivanju ekipe.');
        }
        const data = await response.json();
        setTeam(data.team);
        setTeamId(data.team.team_id);
        setIsTeamLeader(data.team.member_1_code === user.user_code);
      } catch (error) {
        console.error('Napaka pri pridobivanju ekipe:', error);
      }
    };

    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://lanparty.scv.si/api/tournaments');
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Napaka pri pridobivanju turnirjev:', error);
      }
    };

    fetchTeam();
    fetchTournaments();
  }, [user.user_code]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch('https://lanparty.scv.si/api/tournaments');
        if (!response.ok) {
          throw new Error('Napaka pri pridobivanju turnirjev.');
        }
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error('Napaka pri pridobivanju turnirjev:', error);
      }
    };
  
    fetchTournaments();
  }, []);

  const getTournamentName = (id) => {
    const tournament = tournaments.find((t) => t.id === id);
    return tournament ? tournament.name : 'Ni izbran';
  };

  const handleAddMember = async () => {
    if (!teamId) {
      alert('Ekipa ni bila najdena.');
      return;
    }

    if (!memberCode) {
      alert('Prosim, vnesite kodo člana.');
      return;
    }

    try {
      const response = await fetch(`https://lanparty.scv.si/api/update-team-members/${teamId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Napaka: ${data.message}`);
        return;
      }

      alert('Član uspešno dodan!');
      setMemberCode('');
    } catch (error) {
      console.error('Napaka pri dodajanju člana:', error);
      alert('Napaka pri dodajanju člana.');
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeamName || !selectedTournament) {
      alert('Prosim, vnesite ime ekipe in izberite turnir.');
      return;
    }

    try {
      const response = await fetch('https://lanparty.scv.si/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTeamName,
          member_1: user.user_code,
          tournament_id: selectedTournament,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Napaka: ${data.message}`);
        return;
      }

      alert('Ekipa uspešno ustvarjena!');
      setShowModal(false);
      setTeamId(data.team_id);
      setTeam({
        team_name: newTeamName,
        tournament_id: selectedTournament,
        member_1_code: user.user_code,
      });
    } catch (error) {
      console.error('Napaka pri ustvarjanju ekipe:', error);
      alert('Napaka pri ustvarjanju ekipe.');
    }
  };

  const handleRemoveMember = async (memberKey, memberCode) => {
    if (!window.confirm('Ali res želite izbrisati tega člana iz ekipe?')) return;
  
    try {
      const response = await fetch(`https://lanparty.scv.si/api/remove-team-member/${teamId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberCode, requesterCode: user.user_code }), // Dodaj requesterCode
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(`Napaka: ${data.message}`);
        return;
      }
  
      alert(data.message);
      setTeam((prev) => ({
        ...prev,
        [memberKey]: null,
      }));
    } catch (error) {
      console.error('Napaka pri odstranjevanju člana:', error);
      alert('Napaka pri odstranjevanju člana.');
    }
  };

  const handleDeleteTeam = async () => {
    if (!window.confirm('Ali res želite izbrisati to ekipo? Ta operacija je nepovratna.')) return;

    try {
        const response = await fetch(`https://lanparty.scv.si/api/delete-team/${teamId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requesterCode: user.user_code }), // Dodaj requesterCode
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Napaka: ${data.message}`);
            return;
        }

        alert(data.message);
        setTeam(null); // Po brisanju ekipe počisti podatke ekipe
    } catch (error) {
        console.error('Napaka pri brisanju ekipe:', error);
        alert('Napaka pri brisanju ekipe.');
    }
};


  return (
    <div className="register-team-container">
{showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Želite ustvariti ekipo?</h2>
      <label htmlFor="team-name">Ime ekipe:</label>
      <input
        type="text"
        id="team-name"
        placeholder="Vnesite ime ekipe"
        value={newTeamName}
        onChange={(e) => setNewTeamName(e.target.value)}
      />
      <label htmlFor="select-tournament">Izberite turnir:</label>
      <select
        id="select-tournament"
        value={selectedTournament}
        onChange={(e) => setSelectedTournament(e.target.value)}
      >
        <option value="" disabled>
          Izberite turnir
        </option>
        {tournaments.map((tournament) => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.name}
          </option>
        ))}
      </select>
      <div className="modal-buttons">
        <button onClick={handleCreateTeam}>Ustvari ekipo</button>
        <button onClick={() => setShowModal(false)} className="cancel-button">
          Ne
        </button>
      </div>
    </div>
  </div>
)}

      {team ? (
        <div className="team-info">
          <h1>Ime ekipe: {team.team_name}</h1>
          <h2>Turnir: {getTournamentName(team.tournament_id)}</h2>
          <h3>Člani ekipe:</h3>
          <ul>
            {[1, 2, 3, 4, 5].map((index) => {
              const nameKey = `member_${index}_name`;
              const surnameKey = `member_${index}_surname`;
              const codeKey = `member_${index}_code`;

              return team[nameKey] && team[surnameKey] ? (
                <li key={index} className="team-member">
                  {`${team[nameKey]} ${team[surnameKey]}`}
                  {isTeamLeader && team.member_1_code !== team[codeKey] && (
                    <button
                      className="remove-member-button"
                      onClick={() => handleRemoveMember(codeKey, team[codeKey])}
                    >
                      ❌
                    </button>
                  )}
                </li>
              ) : null;
            })}
          </ul>

          {isTeamLeader && (
            <div className="add-member">
              <h3>Dodaj novega člana</h3>
              <input
                type="register-text"
                placeholder="Vnesite kodo člana"
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
              />
              <button onClick={handleAddMember}>Dodaj</button>
            </div>
          )}

          {isTeamLeader && (
            <button className="delete-team-button" onClick={handleDeleteTeam}>
              Izbriši ekipo
            </button>
          )}
        </div>
      ) : (
        <h1>Ekipa ni bila najdena. Ustvarite novo ekipo.</h1>
      )}
    </div>
  );
}

export default TebRegisterTeam;
