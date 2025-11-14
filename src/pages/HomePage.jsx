import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../api/tmdb";
import "../styles/HomePage.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getPopularMovies();
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <div className="home-container">
      <h1>Film Popolari</h1>

      <div className="movie-grid">
        {movies.map(movie => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movie-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
