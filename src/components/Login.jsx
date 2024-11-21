import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

function Login() {
  const { login } = useAuth(); // Use login from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
        const response = await fetch('http://78.47.245.88:8081/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("Response data:", data); // Add this line

        if (!response.ok) {
            setError(data.message);
            return;
        }

        localStorage.setItem('token', data.token);
        setError('');

        login({ username: data.data.username, surname: data.data.surname });
    } catch (err) {
        console.error('Napaka pri prijavi:', err);
        setError('Prišlo je do napake. Poskusite znova.');
    }
};



  return (
    <div className="login-page">
      <h1 className="title">Prijava</h1>
      
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
        <button className="button" onClick={handleLogin}>Prijava</button>
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
