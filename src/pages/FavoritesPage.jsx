import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="page">
      <h1>I tuoi Preferiti</h1>

      {favorites.length === 0 && <p>Nessun contenuto salvato.</p>}

      <div className="fav-grid">
        {favorites.map((item) => (
          <div key={item.id} className="fav-card">
            <Link to={`/${item.media_type}/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
            </Link>

            <p>{item.title || item.name}</p>

            <button onClick={() => removeFavorite(item.id)}>
              Rimuovi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
