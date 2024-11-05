import React from 'react';

function Team() {
  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <h1>DOBRODOŠEL NA <br /> LAN PARTY</h1>
      </div>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>KDAJ?</h2>
          <p>Zadnji vikend februarja</p>
          <p>Pričnemo ob 15:00 28.2.2025</p>
          <p>Končamo ob 03:00 2.3.2025</p>
        </div>
        <div className="dashboard-section">
          <h2>KJE?</h2>
          <p>Šolski center Velenje</p>
          <p>Restavracija Gaudeamus</p>
          <p>Vodnikova cesta 2, 3320 Velenje</p>
        </div>
      </div>
      <button className="dashboard-button">PRIJAVI SE →</button>
    </div>
  );
}

export default Team;
