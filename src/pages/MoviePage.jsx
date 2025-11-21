import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../styles/MoviePage.css";

export default function MoviePage() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);


  useEffect(() => {
    async function loadMovie() {
      const data = await moviesAPI.details(id);
      const creditData = await moviesAPI.credits(id);
      const videoData = await moviesAPI.videos(id);

      setMovie(data);
      setCredits(creditData);

      // Prendiamo il trailer ufficiale da YouTube
      const trailer = videoData.results.find(
        (v) =>
          v.type === "Trailer" &&
          v.site === "YouTube" &&
          v.official === true
      );

      // fallback se non ha official trailer
      const fallback = videoData.results.find(
        (v) => v.site === "YouTube"
      );

      setTrailerKey(trailer?.key || fallback?.key || null);
    }
    loadMovie();
  }, [id]);



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
        className="hero fade-in"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay" />

        {/* ❤️ Icona Preferiti */}
        <div
          className="fav-icon-detail"
          onClick={(e) => {
            if (isFavorite(movie.id)) {
              removeFavorite(movie.id);
            } else {
              addFavorite({
                id: movie.id,
                title: movie.title,
                name: movie.name,
                poster_path: movie.poster_path,
                media_type: movie.media_type || "movie",
              });
            }

            // animazione cuore
            const heart = e.currentTarget.querySelector(".heart");
            if (heart) {
              heart.classList.add("clicked");

              setTimeout(() => {
                heart.classList.remove("clicked");
              }, 400);
            }
          }}
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
          {/* BOTTONI HERO */}
          <div className="hero-buttons">
            {trailerKey && (
              <button
                className="watch-trailer-btn"
                onClick={() => {
                  const trailerSection = document.getElementById("trailer-section");
                  if (trailerSection) {
                    trailerSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                ▶ Guarda Trailer
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="movie-info fade-in">
        <span><b>⭐ Voto:</b> {movie.vote_average.toFixed(1)}</span>
        <span><b>📅 Uscita:</b> {movie.release_date}</span>
        <span><b>🎭 Generi:</b>
          {movie.genres.map((g) => (
            <span key={g.id} className="genre-badge">{g.name}</span>
          ))}
        </span>
      </div>

      {credits && (
        <div className="cast-section fade-in">
          <h2>Cast Principale</h2>
          <div className="cast-list">
            {credits.cast.slice(0, 6).map((c) => (
              <div key={c.id} className="cast-card">
                <img
                  src={
                    c.profile_path
                      ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
                      : "https://via.placeholder.com/185x278?text=No+Image"
                  }
                  alt={c.name}
                />
                <p>{c.name}</p>
              </div>
            ))}
          </div>
        </div>

      )}
      {trailerKey && (
        <div id="trailer-section" className="trailer-section fade-in">
          <h2>Trailer</h2>

          <div className="trailer-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      )}



    </div>
  );
}
