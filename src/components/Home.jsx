import React from 'react';
import '../styles/Home.css';
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import kdaj_bg from '../image/Ellipse_Kdaj.png';
import kdaj_box from '../image/Subtract_Kdaj.png';
import kje_bg from '../image/Ellipse_Kje.png';
import kje_box from '../image/Subtract_Kje.png';
import prijava_bg from '../image/Ellipse-Prijava.png';
import prijava_box from '../image/Subtract-Prijava.png';
import dobrodosel_bg from '../image/Ellipse_Dobrodosel.png';

function Home() {
  const { user } = useAuth(); // User authentication info

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="background-image">
          <img src={dobrodosel_bg} alt="Dobrodošel Background" />
        </div>
        <h1 className="home-title">DOBRODOŠEL NA LAN PARTY</h1>
      </div>

      <div className="info-section">
        {/* Kdaj Section */}
        <div className="info-box">
          <div className="background-image">
            <img src={kdaj_bg} alt="Background Ellipse" />
          </div>
          <div className="foreground-box">
            <img src={kdaj_box} alt="Foreground Box" />
          </div>
          <div className="info-content2">
            <h2>KDAJ?</h2>
            <p>Zadnji vikend februarja</p>
            <p>Pričnemo ob 15:00 28.2.2025</p>
            <p>Končamo ob 03:00 2.3.2025</p>
          </div>
        </div>

        {/* Kje Section */}
        <div className="info-box">
          <div className="background-image">
            <img  src={kje_bg} alt="Background Ellipse" />
          </div>
          <div className="foreground-box2">
            <img src={kje_box} alt="Foreground Box" />
          </div>
          <div className="info-content2">
            <h2>KJE?</h2>
            <p>Šolski center Velenje</p>
            <p>Restavracija Gaudeamus</p>
            <p className="info-kje-special">Vodnikova cesta 2, 3320 Velenje</p>
          </div>
        </div>
      </div>
      <div className='test'>
        {!user && (
        <Link to="/login">
          <button className="login-button">
            <p>PRIJAVI SE <span className="arrow-icon">→</span></p>
            <div className="">
              <img src={prijava_bg} alt="Background Ellipse" />
            </div>          
          </button>
        </Link>
        )}
      </div>


    </div>
  );
}

export default Home;
