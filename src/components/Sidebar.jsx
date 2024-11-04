import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.png';
import '../styles/Sidebar.css';

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh the page after successful logout
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link to="/">
          <img src={logo} alt="FireApp Logo" className="logo" />
        </Link>
        {user && (
          <>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.pgdName}</p> {/* Display PGD name */}
            {user.rank === 'Super Admin' && (
              <select>
                {/* Populate with available PGDs for Super Admin */}
                <option>PGD 1</option>
                <option>PGD 2</option>
              </select>
            )}
          </>
        )}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/pregled-gasilca">PREGLED GAS</Link></li>
          {(user.rank === 'Admin' || user.rank === 'Super Admin') && (
            <li><Link to="/vnos-opreme">VNOS OPREME</Link></li>
          )}
          <li><Link to="/pregled-opreme">PREGLED OPREME</Link></li>
          <li><Link to="/aktivnosti">AKTIVNOSTI</Link></li>
          <li><Link to="/geslo-za-dostop">GESLO ZA DOSTOP</Link></li>
          <li><button onClick={handleLogout} className="logout-button">ODJAVA</button></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
