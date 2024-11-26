import React from 'react';
import '../styles/AboutUs.css';

function Team() {
  return (
    <main className="about-us-content">
        <h2>O nas</h2>
        <div className="about-us-sections">
          <section className="about-us-section">
            <h3>O nas</h3>
            <p>
              Smo ekipa dijakov 4. letnika na ŠCV ERŠ, ki nas druži strast do iger,
              tehnologije in želja po ustvarjanju nepozabnih dogodkov za naše vrstnike...
            </p>
          </section>

          <section className="about-us-section">
            <h3>Naš cilj</h3>
            <p>
              Naš cilj je organizirati nepozaben dogodek, ki bo povezal ljubitelje iger in tehnologije iz naše šole...
            </p>
          </section>

          <section className="about-us-section">
            <h3>Ekipa</h3>
            <p>
              Za ta projekt smo združili moči, kjer vsak izmed nas prispeva svoj del...
            </p>
          </section>

          <section className="about-us-section">
            <h3>Podpora sponzorjev</h3>
            <p>
              Ta dogodek ne bi bil mogoč brez podpore naših sponzorjev...
            </p>
          </section>
        </div>
      </main>
  );
}

export default Team;
