import React, { useState, useEffect } from 'react';
import '../../styles/TebTeam.css';

function TebTeam() {
  const [teams, setTeams] = useState([]);            // All teams
  const [tournaments, setTournaments] = useState([]);  // All tournaments
  const [selectedTournament, setSelectedTournament] = useState("All"); // Default: all tournaments
  const [loading, setLoading] = useState(true);        // Loading indicator
  const [error, setError] = useState(null);            // Error state

  // Fetch teams from API
  useEffect(() => {
    fetch('https://lanparty.scv.si/api/teams')
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

  // Fetch tournaments from API
  useEffect(() => {
    fetch('https://lanparty.scv.si/api/tournaments')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Napaka pri pridobivanju turnirjev');
        }
        return response.json();
      })
      .then((data) => {
        setTournaments(data);
      })
      .catch((err) => {
        console.error('Napaka pri pridobivanju turnirjev:', err);
      });
  }, []);

  // Filter teams by tournament id. We compare the team.tournament_id with the selectedTournament.
  // (We use String() to avoid type mismatches.)
  const filteredTeams =
    selectedTournament === "All"
      ? teams
      : teams.filter(
          (team) =>
            String(team.tournament_id) === String(selectedTournament)
        );

  // Group filtered teams into groups of 5 (each group representing one game)
  const groupTeams = (teamsArray, groupSize) => {
    const grouped = [];
    for (let i = 0; i < teamsArray.length; i += groupSize) {
      grouped.push(teamsArray.slice(i, i + groupSize));
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

  const teamGroups = groupTeams(filteredTeams, 5);
  
  // Find the selected tournament's name (if not "All")
  const selectedTournamentName =
    selectedTournament === "All"
      ? "vse turnirje"
      : tournaments.find(
          (tournament) =>
            String(tournament.id) === String(selectedTournament)
        )?.name || "neznani turnir";

  return (
    <div className="team-container">
      <h1 className="team-title">Ekipe</h1>

      {/* Tournament Filter Section */}
      <div className="filter-section">
        <label htmlFor="tournament-select" className="filter-label">
          Izberi turnir:
        </label>
        <select
          id="tournament-select"
          className="tournament-select"
          value={selectedTournament}
          onChange={(e) => setSelectedTournament(e.target.value)}
        >
          <option value="All">Vsi turnirji</option>
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
        <p className="registration-count">
          {filteredTeams.length} ekip registriranih za {selectedTournamentName}
        </p>
      </div>

      {/* Teams Display (Grouped as Games) */}
      <div className="team-groups">
        {teamGroups.map((group, index) => (
          <div key={index} className="team-group">
            <h2>Ekipa {index * 5 + 1} - {index * 5 + group.length}</h2>
            <div className="team-list">
              {group.map((team) => (
                <button key={team.id} className="team-button">
                  {team.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TebTeam;
