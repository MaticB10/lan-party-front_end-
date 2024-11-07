import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import glyphUndefined from "../image/glyph-undefined.png";
import googleButton from "../image/google-button.png";
import image1 from "../image/image.png";
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="text-wrapper-6">Prijava</div>

          <form className="form">
            <div className="overlap">
              <label className="title-normal" htmlFor="email">
                <div className="header-normal">Email</div>
              </label>
              <div className="frame-2">
                <img
                  className="mail-undefined-glyph"
                  alt="Mail undefined glyph"
                  src={glyphUndefined}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="email-input"
                />
              </div>
            </div>

            <div className="overlap-2">
              <label className="header-normal-wrapper" htmlFor="password">
                <div className="header-normal">Geslo</div>
              </label>
              <div className="frame-2">
                <img
                  className="eye-undefined-glyph"
                  alt="Eye undefined glyph"
                  src={image1}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="password-input"
                />
              </div>
            </div>

            <div className="title-small">
              <div className="text-small">Še nimate računa?</div>
            </div>

            <div className="text-small-wrapper">
              <a href="/register" className="text-small-2">
                Registriraj se zdaj.
              </a>
            </div>

            <button type="submit" className="button-variant">
              <div className="text-wrapper-8">Prijava</div>
            </button>
          </form>
          <img
            className="google-button"
            alt="Google button"
            src={googleButton}
          />
        </div>
      </div>
    </div>

    /*<div className="login-container">
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
    </div>*/
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
