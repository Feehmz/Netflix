import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tvAPI } from "../api/tmdb";
import { useFavorites } from "../context/FavoritesContext";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getBackdrop, getPoster } from "../utils/imageFallback";

import "../styles/TvPage.css";

export default function TvPage() {
  const { id } = useParams();

  const [tv, setTv] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        // CARICO DETTAGLI + CREDITS + VIDEOS tramite append_to_response
        const data = await tvAPI.details(id);

        if (!data) {
          setError("Contenuto non trovato.");
          return;
        }

        setTv(data);
        setCredits(data.credits || { cast: [] });

      } catch (err) {
        console.error("Errore nel caricamento TV:", err);
        setError("Errore nel caricamento della serie TV.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <h2 className="detail-loading">Caricamento...</h2>;
  if (!tv) return <h2 className="detail-error">{error}</h2>;

  // 🔥 ADESSO tv È DEFINITA, POSSIAMO ACCEDERE A VIDEOS
  const trailer =
    tv.videos?.results?.find(
      (v) =>
        (v.type === "Trailer" ||
          v.type === "Teaser" ||
          v.type === "Clip") &&
        v.site === "YouTube"
    ) || null;

  const fallback =
    tv.videos?.results?.find((v) => v.site === "YouTube") || null;

  const trailerKey = trailer?.key || fallback?.key || null;

  // META
  const backdrop = getBackdrop(tv);
  const vote =
    tv.vote_average && tv.vote_average > 0
      ? tv.vote_average.toFixed(1)
      : "N/D";

  const releaseDate = tv.first_air_date || "N/D";
  const genres = tv.genres?.map((g) => g.name) || [];

  const isFav = isFavorite(tv.id);

  return (
    <div className="movie-details-page">

      {/* HERO */}
      <div
        className="hero fade-in"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="hero-overlay" />

        {/* ICONA PREFERITI */}
        <div
          className="fav-icon-detail"
          onClick={() =>
            isFav
              ? removeFavorite(tv.id)
              : addFavorite({
                  id: tv.id,
                  title: tv.name,
                  poster_path: tv.poster_path,
                  media_type: "tv",
                })
          }
        >
          {isFav ? (
            <AiFillHeart className="heart filled" />
          ) : (
            <AiOutlineHeart className="heart outline" />
          )}
        </div>

        {/* CONTENUTO HERO */}
        <div className="hero-content">
          <h1>{tv.name}</h1>
          <p>{tv.overview || "Nessuna descrizione disponibile."}</p>

          {/* META INFO */}
          <div className="hero-meta">
            <span className="rating">⭐ {vote}</span>

            {genres.length > 0 && (
              <>
                <span className="separator">•</span>
                <span className="genres">{genres.join(", ")}</span>
              </>
            )}

            <>
              <span className="separator">•</span>
              <span className="year">{releaseDate}</span>
            </>
          </div>

          {/* BOTTONE TRAILER */}
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
    </div>
  );
}
