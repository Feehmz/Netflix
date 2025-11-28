import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchAPI } from "../api/tmdb";
import "../styles/Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  // Debounce ricerca
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const data = await searchAPI.multi(query);
      setResults(data?.results?.slice(0, 6) || []);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/search?q=${query}`);
    setShowDropdown(false);
    setMobileMenu(false);
  }

  return (
    <header className="navbar">

      {/* LEFT SECTION — LOGO + DESKTOP LINKS */}
      <div className="nav-left">
        <Link className="logo" to="/">NETFLIXX</Link>

        <nav className="nav-links">
          <Link to="/movies">Film</Link>
          <Link to="/tv">Serie TV</Link>
          <Link to="/favorites">Preferiti</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>

      {/* RIGHT SECTION — SEARCH + HAMBURGER */}
      <div className="nav-right">

        {/* Desktop search */}
        <div className="nav-search desktop-search">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Cerca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length > 1 && setShowDropdown(true)}
            />
          </form>

          {showDropdown && results.length > 0 && (
            <div className="search-dropdown">
              {results.map((item) => {
                const type = item.media_type === "tv" ? "tv" : "movie";

                return (
                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/${type}/${item.id}`);
                      setShowDropdown(false);
                    }}
                  >
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                          : "/src/assets/no-image.jpg"
                      }
                    />
                    <span>{item.title || item.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button className="hamburger" onClick={() => setMobileMenu(true)}>☰</button>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MOBILE MENU SLIDE-IN FROM RIGHT */}
      <div className={`mobile-menu ${mobileMenu ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMobileMenu(false)}>✕</button>

        {/* SEARCH INSIDE MOBILE MENU */}
        <div className="mobile-search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Cerca..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Links */}
        <Link to="/movies" onClick={() => setMobileMenu(false)}>Film</Link>
        <Link to="/tv" onClick={() => setMobileMenu(false)}>Serie TV</Link>
        <Link to="/favorites" onClick={() => setMobileMenu(false)}>Preferiti</Link>
        <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
      </div>

    </header>
  );
}
