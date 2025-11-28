# Netflix Clone — SPA React

Questo repository contiene un'app Single Page Application realizzata con React + Vite che replica, a scopo didattico, alcune funzionalità tipiche di Netflix. L'app utilizza le API pubbliche di The Movie Database (TMDB) per mostrare film/serie, gestire i dettagli, cercare contenuti e salvare preferiti.

## Cosa è stato fatto 
- Implementata una UI con pagine e routing (React Router) per: Home, Lista film/serie, Dettaglio (`/movie/:id`, `/tv/:id`), Ricerca (`/search`), Preferiti (`/favorites`), About e NotFoundPage.
- Integrazione con TMDB tramite il modulo `src/api/tmdb.js` (chiamate centralizzate per film, tv e ricerca).
- Stato globale per i preferiti con `FavoritesContext` (`src/context/FavoritesContext.jsx`) e persistenza su `localStorage` tramite il custom hook `src/hooks/useLocalStorage.js`.
- Componenti riutilizzabili: `Navbar`, `Banner`, `MovieRow`, `Footer` .
- Gestione errori e loading nelle chiamate API con fallback visivi e gestione immagini mancanti (`src/utils/imageFallback.js`).

## Uso di Swiper (carousel)
Questo progetto utilizza `swiper` per implementare slider/carousel reattivi nelle righe di film e serie (es. `MovieRow`).
- Perché Swiper:
  - supporto mobile touch/gestures nativo (scorrimento fluido su dispositivi touch);
  - controllo breakpoints e `slidesPerView` per layout responsive;
  - moduli (es. `Navigation`) per frecce/controlli già pronti;

## Perché queste scelte 
- `Context API` per i preferiti: lo stato globale richiesto è limitato (lista preferiti) e Context è più semplice e leggero di Redux per questo caso d'uso. Permette di condividere lo stato tra `Navbar`, `FavoritesPage` e altre componenti senza overhead aggiuntivo.
- `useLocalStorage` (custom hook): centralizza la logica di sincronizzazione con `localStorage` e mantiene il codice dei componenti pulito e riutilizzabile.
- `src/api/tmdb.js`: centralizzare tutte le chiamate API aiuta a gestire errori, logging e possibili ottimizzazioni (caching) in un solo punto.
- Routing con `Outlet`, `useParams` e `useSearchParams`: necessario per pagine dinamiche e per gestire query di ricerca in modo idiomatico.

## Struttura principale del progetto
- `src/` – codice sorgente
  - `api/tmdb.js` — wrapper per le chiamate a TMDB (usa `import.meta.env.VITE_TMDB_API_KEY`)
  - `context/FavoritesContext.jsx` — provider e hook per i preferiti
  - `hooks/useLocalStorage.js` — custom hook per sincronizzare con `localStorage`
  - `components/` — componenti riutilizzabili (`Navbar.jsx`, `Banner.jsx`, `MovieRow.jsx`, `Footer.jsx`)
  - `pages/` — pagine principali (`HomePage.jsx`, `MoviePage.jsx`, `TvPage.jsx`, `SearchPage.jsx`, `FavoritesPage.jsx`, `AboutPage.jsx`, `NotFoundPage.jsx`)
  - `utils/imageFallback.js` — gestione fallback immagini

## Routing (route principali implementate)
- `/` — Homepage con banner e più categorie
- `/movies` — Lista film (opzionale: pagina lista)
- `/tv` — Lista serie TV
- `/movie/:id` — Dettaglio film
- `/tv/:id` — Dettaglio serie TV
- `/search` — Risultati ricerca (usa query string)
- `/favorites` — Lista preferiti (persistente)
- `/about` — Pagina informativa
- `*` — 404 (Not Found)

## Come eseguire in locale
1. Installare dipendenze:

```bash
npm install
```

2. Creare `.env` con la variabile `VITE_TMDB_API_KEY` .

3. Avviare il server di sviluppo:

```bash
npm run dev
```

