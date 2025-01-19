import React, { useState, useEffect } from 'react';
import '../styles/Sponsors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


function Sponsors() {
  const [sponsors, setSponsors] = useState([]); // Podatki o sponzorjih
  const [currentIndex, setCurrentIndex] = useState(0); // Trenutni indeks za navigacijo

  useEffect(() => {
    // Pridobi podatke o sponzorjih iz API-ja
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

  // Izračunaj vidne sponzorje
  const visibleSponsors = sponsors.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < sponsors.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="sponsors-container">
      <h1 className="sponsors-title">Sponzorji</h1>
      <div className="sponsors-content">
        <button
          className="sponsor-nav left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {visibleSponsors.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-card">
            {/* Dodaj placeholder sliko ali podporo za slike, če so vključene v podatke */}
            <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  sponsor.slika
                    ? new URL(`../image/${sponsor.slika}.png`, import.meta.url).href
                    : new URL('../image/default-logo.png', import.meta.url).href
                }
                alt={sponsor.name}
                className="sponsor-logo"
              />
            </a>
            <h2>{sponsor.name}</h2>
            <p>{sponsor.description}</p>
          </div>
        ))}

        <button
          className="sponsor-nav right"
          onClick={handleNext}
          disabled={currentIndex + 3 >= sponsors.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Sponsors;
