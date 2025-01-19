import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/Register.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://lanparty.scv.si/api/register', formData);
      setMessage(response.data.message);
      
      // Po uspešni registraciji ponastavi polja za vnos
      setFormData({
        username: '',
        surname: '',
        email: '',
        password: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Napaka pri registraciji.');
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-title">Registracija</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Ime</label>
          <input type="text" name="username" placeholder="Ime" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Priimek</label>
          <input type="text" name="surname" placeholder="Priimek" value={formData.surname} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <div className="input-icon-wrapper">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          </div>
        </div>

        <div className="input-group">
          <label>Geslo</label>
          <div className="input-icon-wrapper">
            <input type="password" name="password" placeholder="Geslo" value={formData.password} onChange={handleChange} required />
            <FontAwesomeIcon icon={faLock} className="input-icon" />
          </div>
        </div>

        <button type="submit" className="register-button">Registriraj se</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p className="login-text">
        Že imate račun? <a href="/login">Prijavite se.</a>
      </p>
    </div>
  );
}

export default Register;
