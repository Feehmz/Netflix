import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/MovieRow.css";

export default function MovieRow({ title, items }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-list">
        {items.map((movie) => (
          <div key={movie.id} className="row-card">

            {/* Cuore in sovrimpressione */}
            <div
              className="fav-icon"
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

            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            </Link>

            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
