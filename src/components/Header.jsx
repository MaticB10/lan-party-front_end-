import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-title">LAN PARTY 2024/2025</div>
      <nav className="header-nav">
        <Link to="/">Doma</Link>
        <span>|</span>
        <Link to="/team">Ekipa</Link>
        <span>|</span>
        <Link to="/sponsors">Sponzorji</Link>
        <span>|</span>
        <Link to="/blog">Blog</Link>
        <span>|</span>
        <Link to="/about">O nas</Link>
      </nav>
      <div className="header-user">
        <Link to="/login">
          Prijava <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </header>
  );
}

export default Header;
