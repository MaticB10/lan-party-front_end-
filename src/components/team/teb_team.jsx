import React, { useState, useEffect } from 'react';
import '../../styles/TebTeam.css';

function TebTeam() {
  const [teams, setTeams] = useState([]); // Stanje za shranjevanje ekip
  const [loading, setLoading] = useState(true); // Indikator nalaganja
  const [error, setError] = useState(null); // Stanje za napake

  // Pridobivanje podatkov z API-ja
  useEffect(() => {
    fetch('http://78.47.245.88:8081/teams')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Napaka pri pridobivanju podatkov');
        }
        return response.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Napaka:', err);
        setError('Napaka pri pridobivanju ekip.');
        setLoading(false);
      });
  }, []);

  // Razdelitev ekip na skupine po 5
  const groupTeams = (teams, groupSize) => {
    const grouped = [];
    for (let i = 0; i < teams.length; i += groupSize) {
      grouped.push(teams.slice(i, i + groupSize));
    }
    return grouped;
  };

  if (loading) {
    return <p>Nalaganje ekip...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (teams.length === 0) {
    return <p>Še ni prijavljene nobene ekipe.</p>;
  }

  const teamGroups = groupTeams(teams, 5);

  return (
    <div className="team-container">
      <h1 className="team-title">Ekipe</h1>
      <div className="team-groups">
        {teamGroups.map((group, index) => (
          <div key={index} className="team-group">
            <h2>Ekipa {index * 5 + 1} - {index * 5 + group.length}</h2>
            <div className="team-list">
              {group.map((team) => (
                <button key={team.id} className="team-button">{team.name}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TebTeam;
