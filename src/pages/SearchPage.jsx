import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchAPI } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../styles/SearchPage.css";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await searchAPI.multi(query);

      const filtered = data.results.filter(
        (item) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          item.poster_path
      );

      setResults(filtered);
      setLoading(false);
    }
    if (query) load();
  }, [query]);

  if (loading) return <h2>Caricamento...</h2>;

  return (
    <div className="search-container">
      <h1>Risultati per: “{query}”</h1>

      <div className="search-grid">
        {results.map((item) => (
          <div key={item.id} className="search-card">

            <div
              className="fav-icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isFavorite(item.id)) {
                  removeFavorite(item.id);
                } else {
                  addFavorite({
                    id: item.id,
                    title: item.title || item.name,
                    poster_path: item.poster_path,
                    media_type: item.media_type,
                  });
                }
              }}
            >
              {isFavorite(item.id)
                ? <AiFillHeart className="heart filled" />
                : <AiOutlineHeart className="heart outline" />}
            </div>

            <Link to={`/${item.media_type}/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
              />
            </Link>

            <p>{item.title || item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
