import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import balix from '../image/balix-logo.png';
import eigre from '../image/eigre-logo.png';
import sasa from '../image/sasa-inkubator-logo.png';
import itopica from '../image/it-opica.png';
import snackKing from '../image/snac-king-logo.png';
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
        <img src={balix} alt="Balix" />
        <img src={eigre} alt="Eigre" />
        <img src={sasa} alt="SASA Inkubator" />
        <img src={itopica} alt="itopica" />
        <img src={snackKing} alt="Snack King" />
      </div>
    </footer>
  );
}

export default Footer;
