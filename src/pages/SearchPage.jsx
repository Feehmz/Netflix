import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchAPI } from "../api/tmdb";
import { getPoster } from "../utils/imageFallback";
import "../styles/SearchPage.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // quando cambia query → rifacciamo la ricerca
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    async function load() {
      setLoading(true);

      const data = await searchAPI.multi(query);
      setResults(data?.results || []);

      setLoading(false);
    }

    load();
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (value) {
      navigate(`/search?q=${value}`);
    }
  }

  return (
    <div className="search-page fade-in">
      <h1 className="search-title">Risultati per: <span>{query}</span></h1>

      {/* Mini search interna (opzionale) */}
      <form className="search-inline" onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          placeholder="Cerca ancora..."
          defaultValue={query}
        />
      </form>

      {loading && <p className="loading">Caricamento...</p>}

      {!loading && results.length === 0 && query && (
        <p className="no-results">Nessun risultato trovato.</p>
      )}

      <div className="search-grid">
        {results.map((item) => {
          // skip risultati senza poster (optional)
          if (!item.poster_path && !item.backdrop_path) return null;

          const type = item.media_type === "tv" ? "tv" : "movie";

          return (
            <div
              key={item.id}
              className="search-card"
              onClick={() => navigate(`/${type}/${item.id}`)}
            >
              <img
                src={getPoster(item)}
                alt={item.title || item.name}
                loading="lazy"
              />

              <h3>{item.title || item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
