import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../styles/Register.css';

function Register() {
  return (
    <div className="register-page">
      <h1 className="register-title">Registracija</h1>

      <div className="input-group">
        <label>Ime</label>
        <input type="text" placeholder="Ime" />
      </div>

      <div className="input-group">
        <label>Priimek</label>
        <input type="text" placeholder="Priimek" />
      </div>

      <div className="input-group">
        <label>Email</label>
        <div className="input-icon-wrapper">
          <input type="email" placeholder="Email" />
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
        </div>
      </div>

      <div className="input-group">
        <label>Geslo</label>
        <div className="input-icon-wrapper">
          <input type="password" placeholder="Geslo" />
          <FontAwesomeIcon icon={faLock} className="input-icon" />
        </div>
      </div>

      <button className="register-button">Registriraj se</button>

      <p className="login-text">
        Že imate račun? <a href="/login">Prijavite se.</a>
      </p>
    </div>
  );
}

export default Register;
