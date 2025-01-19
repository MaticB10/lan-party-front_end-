import React from 'react';
import '../styles/AboutUs.css';


function Team() {
  return (
      <div className="about-us-content">
        <div className="test">
          <h2>O nas</h2>
        </div>
        <div className="about-us-sections">
          <section className="about-us-section">
            <h3>O nas</h3>
            <p>
            Smo ekipa prijateljev, ki nas druži strast do iger, tehnologije in želja po ustvarjanju nepozabnih dogodkov za naše vrstnike.
            </p>
          </section>

          <section className="about-us-section">
            <h3>Naš cilj</h3>
            <p>
            Naš cilj je organizirati dogodek, ki bo povezal ljubitelje iger in tehnologije ter ustvaril trajne spomine v širši skupnosti.
            </p>
          </section>

          <section className="about-us-section">
            <h3>Ekipa</h3>
            <p>
            Za ta projekt smo združili moči, saj vsak izmed nas prispeva svoj del k ustvarjanju nepozabnega dogodka
            </p>
          </section>

          <section className="about-us-section">
            <h3>Podpora sponzorjev</h3>
            <p>
            Posebno zahvalo namenjamo našim sponzorjem, ki so nas podprli z viri in opremo. Brez njihove pomoči izvedba dogodka ne bi bila mogoča.
            </p>
          </section>
        </div>
      </div>
  );
}

export default Team;
