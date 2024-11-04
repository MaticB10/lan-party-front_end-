import React from 'react';
import '../styles/MainContent.css';

function MainContent() {
  return (
    <div className="main-content">
      <h1>PREGLED</h1>
      <h2>SEZNAM OBVESTIL</h2>
      {/* Example content - replace with your actual content */}
      <div className="notification">
        <div className="notification-header">
          <span className="notification-type">NAPOVED VAJE</span>
          <span className="notification-time">24.05.2024 20:00</span>
        </div>
        <div className="notification-body">
          <p>SPOROČILO: Vaje, preizkus zvez, nakup opreme in oblek, veselica.</p>
          <p>POŠILJATELJ: PGD Trnava - Sebastian Pogorevc</p>
          <p>POSLANO: 24.05.2024 11:52</p>
        </div>
      </div>
      {/* Add more notifications here */}
    </div>
  );
}

export default MainContent;
