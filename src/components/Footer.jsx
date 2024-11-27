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
        <a href="https://balix.si/"><img src={balix} alt="Balix" /></a>
        <a href="https://eigre.si/"><img src={eigre} alt="Eigre" /></a>
        <a href="https://sasainkubator.si/"><img src={sasa} alt="SASA Inkubator" /></a>
        <a href="https://it.opica.si/"><img src={itopica} alt="itopica" /></a>
        <a href="https://snacking.si/"><img src={snackKing} alt="Snack King" /></a>        
      </div>
    </footer>
  );
}

export default Footer;
