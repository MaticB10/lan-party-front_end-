import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../contexts/AuthContext';
import LoginInput from '../components/LoginInput';

function LoginPage({ loginSucess }) {
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function networkLogin({ email, password }) {
    try {
      const response = await fetch('http://78.47.245.88:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (response.ok) {
        return { error: false, data: result.data, token: result.token };
      } else {
        return { error: true, data: result.message };
      }
    } catch (error) {
      return { error: true, data: 'Network error' };
    }
  }

  async function onLogin({ email, password }) {
    const { error, data, token } = await networkLogin({ email, password });

    if (error) {
      setErrorMsg(data);
    } else {
      login({ ...data, token }); // Ensure that login gets all necessary data
      loginSucess(data);
      window.location.reload(); // Refresh the page after successful login
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="FireApp Logo" className="login-logo" />
        </div>
        <div className="login-body">
          <h2>Prijava uporabnika</h2>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          <LoginInput login={onLogin} />
          <div className="help-text">
            <a href="#">Kje pridobim PIN kodo?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSucess: PropTypes.func.isRequired,
};

export default LoginPage;
