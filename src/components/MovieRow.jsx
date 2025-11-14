import { Link } from "react-router-dom";
import "./../styles/MovieRow.css";

export default function MovieRow({ title, items, type = "movie" }) {
  if (!items?.length) return null;

  return (
    <div className="row-container">
      <h2>{title}</h2>

      <div className="row-scroll">
        {items.map(item => (
          <Link
            to={`/${type}/${item.id}`}
            key={item.id}
            className="row-item"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
              alt={item.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
