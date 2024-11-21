import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">DOBRODOŠEL NA LAN PARTY</h1>
      </header>

      <div className="info-section">
        <div className="info-box">
          <img src="./image/Ellipse_Kdaj.png" alt="Ellipse" />
          <h2>KDAJ?</h2>
          <p>Zadnji vikend februarja</p>
          <p>Pričnemo ob 15:00 28.2.2025</p>
          <p>Končamo ob 03:00 2.3.2025</p>
        </div>

        <div className="info-box">
          <h2>KJE?</h2>
          <p>Šolski center Velenje</p>
          <p>Restavracija Gaudeamus</p>
          <p>Vodnikova cesta 2, 3320 Velenje</p>
        </div>
      </div>

      <button className="register-button">
        PRIJAVI SE <span className="arrow-icon">→</span>
      </button>
    </div>
  );
}

export default Home;
