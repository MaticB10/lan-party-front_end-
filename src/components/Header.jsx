import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

function Header() {
    const { user, logout } = useAuth(); // Access user and logout function from context
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logout(); // Clear user data and token
        navigate('/login'); // Redirect to login page
    };

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
                {user ? (
                    <div className="user-menu">
                        <span onClick={toggleDropdown} className="user-name">
                            {user.username} {user.surname} <FontAwesomeIcon icon={faUser} />
                        </span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">Profile</Link>
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
