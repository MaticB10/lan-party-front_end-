import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav-links">
        <ul>
          <li><a href="https://spin3.sos112.si/javno/zemljevid">SPIN</a></li>
          <li><a href="https://vreme.arso.gov.si/napoved/Ljubljana/graf">VREME (ARSO)</a></li>
          <li><a href="https://map.blitzortung.org/#7.51/45.95/15.338">UDARI STREL</a></li>
          <li><a href="https://www.geostik.com/">GEOSTIK</a></li>
          <li><a href="https://smok.sos112.si/Voda/PostajaMap/Map?Alarm=True&Narasca=True&Pada=True&Ustaljen=True&Brez=False">SMOK</a></li>
          <li><a href="https://www.ventusky.com/?p=46.08;15.31;8&l=radar">VENTUSKY</a></li>
          <li><a href="https://zgs.gisportal.si/javno/profile.aspx?id=EGC@ZGS&AspxAutoDetectCookieSupport=1">GOZDNE CESTE</a></li>
          <li><a href="https://gasilec.net/">GASILC.NET</a></li>
        </ul>
      </nav>
      <div className="header-icons">
        <FontAwesomeIcon icon={faCog} className="header-icon" title="Settings" />
        <FontAwesomeIcon icon={faUser} className="header-icon" title="User Profile" />
      </div>
    </header>
  );
}

export default Header;
