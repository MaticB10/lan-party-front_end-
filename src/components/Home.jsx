import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Home.css';

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-container">
      <p>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const eventStart = new Date('2025-02-28T15:00:00').getTime();

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <header className="home-header">
        <h1 className="home-title">DOBRODOŠEL NA LAN PARTY</h1>
        <p className="hero-blurb">
          Pridruži se nam na največjem šolskem gamerskem dogodku leta.  
          Pričakuj napete turnirje, epske bitke in nepozabno druženje!
        </p>
      </header>

      {/* COUNTDOWN */}
      <Countdown targetDate={eventStart} />

      {/* INFO SECTION */}
      <section className="info-section">
        {/* Kdaj Card */}
        <div className="info-box">
          <div className="info-content">
            <h2>
              <span className="icon">
                {/* Calendar SVG */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8H21V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              KDAJ?
            </h2>
            <p>Zadnji vikend februarja</p>
            <p>Pričnemo ob 15:00 28.2.2025</p>
            <p>Končamo ob 03:00 2.3.2025</p>
          </div>
        </div>

        {/* Kje Card */}
        <div className="info-box">
          <div className="info-content">
            <h2>
              <span className="icon">
                {/* Location SVG */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 11C13.3807 11 14.5 9.88071 14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 8.5C19 13.5 12 21 12 21C12 21 5 13.5 5 8.5C5 4.91015 7.91015 2 11.5 2H12.5C16.0899 2 19 4.91015 19 8.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              KJE?
            </h2>
            <p>Šolski center Velenje</p>
            <p>Restavracija Gaudeamus</p>
            <p className="address">Vodnikova cesta 2, 3320 Velenje</p>
          </div>
        </div>
      </section>

      {/* CTA BUTTON */}
      <div className="button-container">
        {!user && (
          <Link to="/login">
            <button className="home-button">
              <p>
                PRIJAVI SE <span className="arrow-icon">→</span>
              </p>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
