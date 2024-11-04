import React, { useEffect, useState, useContext } from 'react';
import '../styles/PregledGasilca.css';
import { AuthContext } from '../contexts/AuthContext';

function PregledGasilca() {
  const { user } = useContext(AuthContext);
  const [firefighters, setFirefighters] = useState([]);
  const [selectedFirefighterId, setSelectedFirefighterId] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (user && user.pgdId) {
      fetch(`http://localhost:8081/pregled-gasilca/${user.pgdId}`)
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            setFirefighters(data.data);
          }
        })
        .catch(err => console.error('Failed to fetch firefighters:', err));
    }
  }, [user]);

  const handleSelectFirefighter = (firefighterId) => {
    if (selectedFirefighterId === firefighterId) {
      setSelectedFirefighterId(null); // Deselect if clicking the same firefighter
    } else {
      setSelectedFirefighterId(firefighterId);
      setIsNewUser(false);
    }
  };

  const handleEditFirefighter = (event) => {
    event.preventDefault();
    // Add logic to edit firefighter details
    console.log('Editing firefighter:', firefighters.find(f => f.id === selectedFirefighterId));
  };

  const handleDeleteFirefighter = () => {
    // Add logic to delete firefighter
    console.log('Deleting firefighter:', selectedFirefighterId);
    setFirefighters(firefighters.filter(f => f.id !== selectedFirefighterId));
    setSelectedFirefighterId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFirefighters(firefighters.map(f => 
      f.id === selectedFirefighterId ? { ...f, [name]: value } : f
    ));
  };

  const handleAddNewUser = () => {
    setSelectedFirefighterId(null);
    setIsNewUser(true);
  };

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setFirefighters([...firefighters, { id: Date.now(), [name]: value }]);
  };

  const handleNewUserSubmit = (event) => {
    event.preventDefault();
    // Add logic to save the new user
    console.log('New user:', firefighters[firefighters.length - 1]);
    setIsNewUser(false);
  };

  const selectedFirefighter = firefighters.find(f => f.id === selectedFirefighterId);

  const canEdit = user && (user.rank === 'Super Admin' || user.rank === 'Admin');

  return (
    <div className="pregled-gasilca">
      <h2>Pregled Gasilca</h2>
      <div className="firefighter-list">
        {firefighters.map((firefighter) => (
          <div key={firefighter.id}>
            <div
              className={`firefighter-item ${selectedFirefighterId === firefighter.id ? 'selected' : ''}`}
              onClick={() => handleSelectFirefighter(firefighter.id)}
            >
              {firefighter.firstName} {firefighter.lastName}
            </div>
            {selectedFirefighterId === firefighter.id && (
              <div className="firefighter-details">
                <h3>Podatki Gasilca</h3>
                <form onSubmit={handleEditFirefighter}>
                  <div className="form-group">
                    <label htmlFor="name">Ime:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={selectedFirefighter.firstName}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={selectedFirefighter.email}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={selectedFirefighter.phone}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birthDate">Datum Rojstva:</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={selectedFirefighter.birthDate}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="joinDate">Datum Pridružitve:</label>
                    <input
                      type="date"
                      id="joinDate"
                      name="joinDate"
                      value={selectedFirefighter.joinDate}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="rank">Gasilski Čin:</label>
                    <input
                      type="text"
                      id="rank"
                      name="rank"
                      value={selectedFirefighter.rank}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="specialties">Specialnosti:</label>
                    <input
                      type="text"
                      id="specialties"
                      name="specialties"
                      value={selectedFirefighter.specialties}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Funkcija:</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={selectedFirefighter.role}
                      onChange={handleChange}
                      required
                      disabled={!canEdit}
                    />
                  </div>
                  {canEdit && (
                    <>
                      <button type="submit" className="btn btn-primary">Shrani</button>
                      <button type="button" className="btn btn-danger" onClick={handleDeleteFirefighter}>Izbriši</button>
                    </>
                  )}
                </form>
              </div>
            )}
          </div>
        ))}
        {isNewUser && canEdit && (
          <div className="firefighter-details">
            <h3>Dodaj novega Gasilca</h3>
            <form onSubmit={handleNewUserSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ime:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefon:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Datum Rojstva:</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="joinDate">Datum Pridružitve:</label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rank">Gasilski Čin:</label>
                <input
                  type="text"
                  id="rank"
                  name="rank"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="specialties">Specialnosti:</label>
                <input
                  type="text"
                  id="specialties"
                  name="specialties"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Funkcija:</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  onChange={handleNewUserChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Dodaj</button>
            </form>
          </div>
        )}
      </div>
      {canEdit && (
        <button className="btn btn-success add-new-user" onClick={handleAddNewUser}>Dodaj novega uporabnika</button>
      )}
    </div>
  );
}

export default PregledGasilca;
