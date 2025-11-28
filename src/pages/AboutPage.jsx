import "../styles/AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about">
      <div className="about-container">
        <h1>Informazioni su questo progetto</h1>

        <p className="subtitle">
          Questa applicazione è stata sviluppata come progetto finale del corso
          Front-End, utilizzando React e le API di The Movie Database .
        </p>

        <section className="about-section">
          <h2>Obiettivo del Progetto</h2>
          <p>
            L’obiettivo principale è creare una <strong>Single Page Application (SPA) </strong>
            in stile Netflix, con funzionalità di ricerca, preferiti, pagine
            dettaglio e gestione dello stato globale tramite Context API.
          </p>
        </section>

        <section className="about-section">
          <h2>Tecnologie Utilizzate</h2>
          <ul>
            <li>React + Vite</li>
            <li>React Router</li>
            <li>Context API</li>
            <li>TMDB API</li>
            <li>CSS puro</li>
            <li>Swiper.js</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Funzionalità Principali</h2>
          <ul>
            <li>Homepage con categorie dinamiche</li>
            <li>Ricerca film e serie TV</li>
            <li>Pagine dettaglio con cast e informazioni complete</li>
            <li>Lista preferiti con salvataggio in localStorage</li>
            <li>Layout responsive e user-friendly</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Team di Sviluppo</h2>
          <p>
            Progetto sviluppato da <strong>Federico Peducci</strong> e{" "}
            <strong>Stanislau Kukharonak</strong>.
          </p>
        </section>

        <section className="about-section">
          <h2>Note Aggiuntive</h2>
          <p>
            Questo progetto è stato realizzato seguendo le linee guida fornite
            durante il corso, con attenzione a best practices, struttura del
            codice, responsive design e gestione dello stato.
          </p>
        </section>
      </div>
    </div>
  );
}
