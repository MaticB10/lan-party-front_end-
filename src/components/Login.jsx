import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://lanparty.scv.si/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem('token', data.token);
      setError('');

      login(data.data);
    } catch (err) {
      console.error('Napaka pri prijavi:', err);
      setError('Prišlo je do napake. Poskusite znova.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Prijava</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Geslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="login-button" onClick={handleLogin}>
            Prijava
          </button>
        </div>

        <p className="register-text">
          Še nimate računa? <a href="/register">Registriraj se zdaj.</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
