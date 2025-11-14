import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "../api/tmdb";
import "../styles/MoviePage.css";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function loadMovie() {
      const data = await moviesAPI.details(id);
      setMovie(data);
    }
    loadMovie();
  }, [id]);

  if (!movie) return <h2>Caricamento...</h2>;

  return (
    <div className="movie-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
        className="movie-image"
      />

      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}
