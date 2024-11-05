import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <h1>Prijava</h1>
      <form className="login-form">
        <div className="input-group">
          <label>Email</label>
          <div className="input-icon">
            <input type="email" placeholder="Email" />
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
          </div>
        </div>
        <div className="input-group">
          <label>Geslo</label>
          <div className="input-icon">
            <input type="password" placeholder="Geslo" />
            <FontAwesomeIcon icon={faEye} className="icon" />
          </div>
        </div>
        <button type="submit" className="login-button">Prijava</button>
        <div className="social-login">
          <button className="google-login">
            <FontAwesomeIcon icon={faGoogle} /> Prijava z Google
          </button>
        </div>
        <p className="register-text">
          Še nimate računa? <a href="#register">Registriraj se zdaj.</a>
        </p>
      </form>
    </div>
  );
}

function Timer(props) {
  const [counter, setCounter] = useState(props.loginDelayTimer);

  useEffect(() => {
      counter > 0 && setTimeout(() => {
          setCounter(counter - 1);
          if (counter === 1) { props.callback && props.callback(); }
      }, 1000);
  }, [counter]);

  return (<div>`Naslednji poskus vpisa čez ${counter} sekund`</div>);
}

export default Login;
