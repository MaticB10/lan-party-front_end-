import React, { useState } from 'react';
import '../styles/Sponsors.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const sponsorsData = [
  {
    logo: '/path/to/opica-logo.png',
    name: 'Opica',
    description:
      'Opica.si ponosno zagotavljajo raznovrstne informacijske storitve in rešitve z namenom, da bi vsakomur omogočili dostop do visokokakovostnih in dobro urejenih IT sistemov...',
  },
  {
    logo: '/path/to/komponentko-logo.png',
    name: 'Komponentko',
    description:
      'Komponentko je vaš trgovec z računalniško in drugo zabavno elektroniko s poudarkom na omogočanju ponovne uporabe rabljene elektronike...',
  },
  {
    logo: '/path/to/lenovo-logo.png',
    name: 'Lenovo',
    description:
      'Lenovova zgodba je bila vedno o oblikovanju računalniške inteligence za ustvarjanje boljšega sveta...',
  },
  {
    logo: '/path/to/extra-logo.png',
    name: 'Extra Sponsor',
    description:
      'This is an additional sponsor description for testing purposes...',
  },
  // Add more sponsors as needed
];

function Sponsors() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleSponsors = sponsorsData.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < sponsorsData.length) {
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
        <button className="sponsor-nav left" onClick={handlePrev} disabled={currentIndex === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {visibleSponsors.map((sponsor, index) => (
          <div key={index} className="sponsor-card">
            <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
            <h2>{sponsor.name}</h2>
            <p>{sponsor.description}</p>
          </div>
        ))}

        <button
          className="sponsor-nav right"
          onClick={handleNext}
          disabled={currentIndex + 3 >= sponsorsData.length}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Sponsors;
