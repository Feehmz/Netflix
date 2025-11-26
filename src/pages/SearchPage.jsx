import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchAPI } from "../api/tmdb";
import { getPoster } from "../utils/imageFallback";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../context/FavoritesContext";

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

      setResults(data?.results || []);
      setLoading(false);
    }

    load();
  }, [query]);

  if (loading) return <h2 className="loading">Caricamento...</h2>;

  return (
    <div className="search-page fade-in">
      <h1>
        Risultati per: <span className="query">"{query}"</span>
      </h1>

      <div className="search-grid">
        {results.map((item) => {
          if (!item.id) return null;

          // 🔥 Determina se è film o serie TV
          const type =
            item.media_type ||
            (item.first_air_date ? "tv" : "movie");

          const title = item.title || item.name || "Titolo non disponibile";

          return (
            <div key={item.id} className="search-card">

              {/* ❤️ icona preferiti */}
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
                      title: item.title,
                      name: item.name,
                      poster_path: item.poster_path,
                      media_type: type,
                    });
                  }

                  const heart = e.currentTarget.querySelector(".heart");
                  if (heart) {
                    heart.classList.add("clicked");
                    setTimeout(() => heart.classList.remove("clicked"), 350);
                  }
                }}
              >
                {isFavorite(item.id) ? (
                  <AiFillHeart className="heart filled" />
                ) : (
                  <AiOutlineHeart className="heart outline" />
                )}
              </div>

              {/* 📌 LINK DINAMICO: film → /movie/id, serie → /tv/id */}
              <Link to={`/${type}/${item.id}`}>
                <img src={getPoster(item)} alt={title} />
                <p>{title}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
