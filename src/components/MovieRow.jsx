import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../context/FavoritesContext";
import { getPoster } from "../utils/imageFallback";
import "../styles/MovieRow.css";

export default function MovieRow({ title, items }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-list">
        {items.map((movie) => {
          // 🔥 QUI la logica corretta: determinare se è film o serie
          const type =
            movie.media_type ||
            (movie.first_air_date ? "tv" : "movie");

          return (
            <div key={movie.id} className="row-card">

              {/* ❤️ icona preferiti */}
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
                      media_type: type,
                    });
                  }

                  // Animazione cuore
                  const heart = e.currentTarget.querySelector(".heart");
                  if (heart) {
                    heart.classList.add("clicked");
                    setTimeout(() => heart.classList.remove("clicked"), 400);
                  }
                }}
              >
                {isFavorite(movie.id) ? (
                  <AiFillHeart className="heart filled" />
                ) : (
                  <AiOutlineHeart className="heart outline" />
                )}
              </div>

              {/* LINK DINAMICO */}
              <Link to={`/${type}/${movie.id}`}>
                <img
                  src={getPoster(movie)}
                  alt={movie.title || movie.name || "Senza titolo"}
                />
              </Link>

              <p>{movie.title || movie.name || "Titolo non disponibile"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
