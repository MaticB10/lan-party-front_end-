import React, { useState, useEffect } from 'react';
import '../styles/Sponsors.css';

function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetch('https://lanparty.scv.si/api/sponsors')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Napaka pri pridobivanju podatkov.');
        }
        return response.json();
      })
      .then((data) => {
        setSponsors(data);
      })
      .catch((error) => {
        console.error('Napaka pri pridobivanju sponzorjev:', error);
      });
  }, []);

  return (
    <div className="sponsors-container">
      <h1 className="sponsors-title">Sponzorji</h1>
      <p className="sponsors-subtitle">
        Posebna zahvala našim sponzorjem za podporo največjemu gaming dogodku leta!
      </p>

      <div className="sponsor-grid">
        {sponsors.map((sponsor, index) => (
          // Entire card is clickable, triggers sponsor link
          <a
            key={sponsor.id}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sponsor-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <img
              src={
                sponsor.slika
                  ? new URL(`../image/${sponsor.slika}.png`, import.meta.url).href
                  : new URL('../image/default-logo.png', import.meta.url).href
              }
              alt={sponsor.name}
              className="sponsor-logo"
            />
            <h2>{sponsor.name}</h2>
            <p className="sponsor-description">{sponsor.description}</p>
          </a>
        ))}
      </div>

      {/* CTA at the bottom */}
      <div className="sponsors-cta">
        <p>Bi želeli tudi vi postati sponzor?</p>
        <a href="mailto:info@lanparty.scv.si" className="cta-button">
          Kontaktiraj nas
        </a>
      </div>
    </div>
  );
}

export default Sponsors;
