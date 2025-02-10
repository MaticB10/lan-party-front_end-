import React from 'react';
import '../styles/AboutUs.css';

function Team() {
  return (
    <div className="about-us-page">
      {/* HEADER */}
      <header className="about-us-header">
        <h1 className="about-us-title">O nas</h1>
      </header>

      {/* CONTENT SECTIONS */}
      <div className="about-us-content">
        <section className="about-us-section">
          <h2>O nas</h2>
          <p>
            Smo ekipa prijateljev, ki nas druži strast do iger, tehnologije in želja po ustvarjanju nepozabnih dogodkov za naše vrstnike.
          </p>
        </section>

        <section className="about-us-section">
          <h2>Naš cilj</h2>
          <p>
            Naš cilj je organizirati dogodek, ki bo povezal ljubitelje iger in tehnologije ter ustvaril trajne spomine v širši skupnosti.
          </p>
        </section>

        <section className="about-us-section">
          <h2>Ekipa</h2>
          <p>
            Za ta projekt smo združili moči, saj vsak izmed nas prispeva svoj del k ustvarjanju nepozabnega dogodka.
          </p>
        </section>

        <section className="about-us-section">
          <h2>Podpora sponzorjev</h2>
          <p>
            Posebno zahvalo namenjamo našim sponzorjem, ki so nas podprli z viri in opremo. Brez njihove pomoči izvedba dogodka ne bi bila mogoča.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Team;
