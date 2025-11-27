import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getBackdrop, getPoster } from "../utils/imageFallback";

import "../styles/MoviePage.css";

export default function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadMovie() {
      try {
        setLoading(true);
        setError(null);

        // dettagli + credits + videos in parallelo
        const [data, creditData, videoData] = await Promise.all([
          moviesAPI.details(id),
          moviesAPI.credits(id),
          moviesAPI.videos(id),
        ]);

        if (!data) {
          setError("Contenuto non trovato.");
          return;
        }

        setMovie(data);
        setCredits(creditData || { cast: [] });

        const videos = videoData?.results ?? [];
        const trailer =
          videos.find(
            (v) =>
              (v.type === "Trailer" ||
                v.type === "Teaser" ||
                v.type === "Clip") &&
              v.site === "YouTube"
          ) || null;

        const fallback =
          videos.find((v) => v.site === "YouTube") || null;

        setTrailerKey(trailer?.key || fallback?.key || null);
      } catch (err) {
        console.error("Errore Movie:", err);
        setError("Errore nel caricamento del film.");
      } finally {
        setLoading(false);
      }
    }

    loadMovie();
  }, [id]);

  if (loading) return <h2 className="detail-loading">Caricamento...</h2>;
  if (!movie) return <h2 className="detail-error">{error}</h2>;

  const backdrop = getBackdrop(movie);

  const vote =
    movie.vote_average && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : "N/D";

  const releaseDate = movie.release_date || "N/D";
  const genres = movie.genres?.map((g) => g.name) || [];

  const isFav = isFavorite(movie.id);

  return (
    <div className="movie-details-page">
      {/* HERO */}
      <div
        className="hero fade-in"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="hero-overlay" />

        {/* ❤️ Preferiti */}
        <div
          className="fav-icon-detail"
          onClick={() =>
            isFav
              ? removeFavorite(movie.id)
              : addFavorite({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                media_type: "movie",
              })
          }
        >
          {isFav ? (
            <AiFillHeart className="heart filled" />
          ) : (
            <AiOutlineHeart className="heart outline" />
          )}
        </div>

        {/* Contenuto hero */}
        <div className="hero-content">
          <h1>{movie.title}</h1>
          <p>{movie.overview || "Nessuna descrizione disponibile."}</p>

          {/* ⭐ Voto • Generi • Data completa */}
          <div className="hero-meta">
            <span className="rating">⭐ {vote}</span>

            {genres.length > 0 && (
              <>
                <span className="separator"> • </span>
                <span className="genres">{genres.join(", ")}</span>
              </>
            )}

            <>
              <span className="separator"> • </span>
              <span className="year">{releaseDate}</span>
            </>
          </div>

          {/* Bottone trailer */}
          {trailerKey && (
            <button
              className="watch-trailer-btn"
              onClick={() =>
                document
                  .getElementById("trailer-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ▶ Guarda Trailer
            </button>
          )}
        </div>
      </div>

      {/* CAST */}
      {credits?.cast?.length > 0 && (
        <div className="cast-section fade-in">
          <h2>Cast principale</h2>
          <div className="cast-list">
            {credits.cast.slice(0, 8).map((c) => (
              <div key={c.id} className="cast-card">
                <img src={getPoster(c)} alt={c.name} loading="lazy" />
                <p>{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRAILER */}
      {trailerKey && (
        <div id="trailer-section" className="trailer-section fade-in">
          <h2>Trailer</h2>
          <div className="trailer-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              frameBorder="0"
              allowFullScreen
              title="Trailer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
