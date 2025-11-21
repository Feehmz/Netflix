import { NavLink, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/Navbar.css";


export default function Navbar() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  // search nella navbar
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const raw = formData.get("q");
    const query = typeof raw === "string" ? raw.trim() : "";

    if (query.length > 0) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          NetFlexx
        </NavLink>

        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
          Home
        </NavLink>

        <NavLink to="/movies" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Film
        </NavLink>

        <NavLink to="/tv" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Serie TV
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Preferiti ({favorites.length})
        </NavLink>


        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          About
        </NavLink>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="q"
            placeholder="Cerca..."
            className="navbar-search-input"
          />
        </form>
      </div>
    </nav>
  );
}
