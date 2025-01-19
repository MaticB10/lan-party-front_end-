import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header({ studentId }) {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-title">
                <Link to="/">LAN PARTY 2024/2025</Link>
            </div>
            <nav className="header-nav">
                <Link to="/team">Ekipa</Link>
                <span>|</span>
                <Link to="/sponsors">Sponzorji</Link>
                <span>|</span>
                <Link to="/blog">Blog</Link>
                <span>|</span>
                <Link to="/about">O nas</Link>
            </nav>
            <div className="header-user">
                {user ? (
                    <div className="user-menu">
                        <span onClick={toggleDropdown} className="user-name">
                            {user.username} {user.surname} <FontAwesomeIcon icon={faUser} />
                        </span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <span className="dropdown-item">Vaša koda: {user.user_code}</span>
                                <span onClick={handleLogout} className="dropdown-item">Logout</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        Prijava <FontAwesomeIcon icon={faUser} />
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
