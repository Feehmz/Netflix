import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../styles/MoviePage.css";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadMovie() {
      const data = await moviesAPI.details(id);
      setMovie(data);
    }
    loadMovie();
  }, [id]);

  if (!movie) return <h2>Caricamento...</h2>;

  return (
    <div className="movie-details-page">

      {/* HERO SECTION */}
      <div
        className="hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay" />

        {/* ❤️ Icona Preferiti */}
        <div
          className="fav-icon-detail"
          onClick={() =>
            isFavorite(movie.id)
              ? removeFavorite(movie.id)
              : addFavorite({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  media_type: "movie",
                })
          }
        >
          {isFavorite(movie.id) ? (
            <AiFillHeart className="heart filled" />
          ) : (
            <AiOutlineHeart className="heart outline" />
          )}
        </div>

        {/* TESTO NEL BANNER */}
        <div className="hero-content">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </div>
      </div>

    </div>
  );
}
