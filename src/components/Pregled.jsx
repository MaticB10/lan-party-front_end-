import React from 'react';
import '../styles/Pregled.css';

function Pregled() {
  return (
    <div className="pregled">
      <h1>PREGLED GAS</h1>
      <h2>SEZNAM OBVESTIL</h2>
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

export default Pregled;
