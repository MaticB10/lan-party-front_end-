import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-page">
      <h1 className="title">Prijava</h1>
      
      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
        <input type="text" placeholder="Email" />
      </div>
      
      <div className="input-group">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input type="password" placeholder="Geslo" />
      </div>
      
      <div className="button-group">
        <button className="button">Prijava</button>
        <div className="social-icons">
          <button className="icon-button google-button">
            <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button className="icon-button discord-button">
            <FontAwesomeIcon icon={faDiscord} />
          </button>
        </div>
      </div>
      
      <p className="register-text">
        Še nimate računa? <a href="/register">Registriraj se zdaj.</a>
      </p>
    </div>
  );
}

export default Login;
