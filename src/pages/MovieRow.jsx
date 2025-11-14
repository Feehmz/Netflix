import { Link } from "react-router-dom";
import "../styles/MovieRow.css";

export default function MovieRow({ title, movies }) {
  return (
    <div className="movie-row">
      <h2>{title}</h2>

      <div className="movie-row-scroll">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-row-item">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
