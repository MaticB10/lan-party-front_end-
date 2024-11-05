import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="contact-info">
        <h3>Kontaktirajte nas:</h3>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> lanparty@scv.si
        </p>
        <p>
          <FontAwesomeIcon icon={faInstagram} /> ers_lan_scv
        </p>
        <p>
          <FontAwesomeIcon icon={faDiscord} /> Lan Party 2024
        </p>
      </div>
      <div className="sponsors">
        <img src="/images/balix.png" alt="Balix" />
        <img src="/images/logo2.png" alt="Sponsor Logo 2" />
        <img src="/images/sasa.png" alt="SASA Inkubator" />
        <img src="/images/uvi.png" alt="UVI" />
        <img src="/images/snackking.png" alt="Snack King" />
      </div>
    </footer>
  );
}

export default Footer;
