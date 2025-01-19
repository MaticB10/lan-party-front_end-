import React, { useState, useEffect } from 'react';
import '../../styles/teb_register_team.css';
import { useAuth } from '../../contexts/AuthContext';

function TebRegisterTeam() {
    const { user } = useAuth();
    const [team, setTeam] = useState(null);
    const [teamId, setTeamId] = useState(null);
    const [tournaments, setTournaments] = useState([]);
    const [memberCode, setMemberCode] = useState('');
    const [loading, setLoading] = useState(true); // Za upravljanje nalaganja podatkov

    // Pridobi podatke o ekipi ob nalaganju
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(`https://lanparty.scv.si/api/team-by-user/${user.user_code}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.log('Uporabnik še ni član nobene ekipe.');
                        setLoading(false);
                        return;
                    }
                    throw new Error('Napaka pri pridobivanju ekipe.');
                }
                const data = await response.json();
                setTeam(data.team);
                setTeamId(data.team.team_id);
                console.log('Najdena ekipa:', data.team);
            } catch (error) {
                console.error('Napaka pri pridobivanju ekipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [user.user_code]);

    // Funkcija za dodajanje člana
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

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Napaka: ${errorData.message}`);
                return;
            }

            alert('Član uspešno dodan!');
            setMemberCode('');
            // Osveži podatke ekipe
            const updatedTeam = await fetch(`https://lanparty.scv.si/api/team-by-user/${user.user_code}`).then((res) =>
                res.json()
            );
            setTeam(updatedTeam.team);
        } catch (error) {
            console.error('Napaka pri dodajanju člana:', error);
            alert('Napaka pri dodajanju člana.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="register-team-container">
            {team ? (
                <div className="team-info">
                    <h1>Ime ekipe: {team.team_name}</h1>
                    <h2>Turnir: {team.tournament_id || 'Ni izbran'}</h2>
                    <h3>Člani ekipe:</h3>
                    <ul>
                        {[team.member_1_name, team.member_2_name, team.member_3_name, team.member_4_name, team.member_5_name]
                            .filter(Boolean) // Prikaži samo obstoječe člane
                            .map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                    </ul>

                    {/* Funkcionalnost za dodajanje članov */}
                    {team.member_1 === user.user_code && (
                        <div className="add-member">
                            <h3>Dodaj novega člana</h3>
                            <input
                                type="text"
                                placeholder="Vnesite kodo člana"
                                value={memberCode}
                                onChange={(e) => setMemberCode(e.target.value)}
                            />
                            <button onClick={handleAddMember}>Dodaj</button>
                        </div>
                    )}
                </div>
            ) : (
                <h1>Ekipa ni bila najdena. Ustvarite novo ekipo.</h1>
            )}
        </div>
    );
}

export default TebRegisterTeam;
