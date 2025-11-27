import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "../context/FavoritesContext";
import { getPoster } from "../utils/imageFallback";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import "../styles/MovieRow.css";

export default function MovieRow({ title, items = [] }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = (e, movie, type) => {
    e.stopPropagation();
    e.preventDefault();

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

    const heart = e.currentTarget.querySelector(".heart");
    if (heart) {
      heart.classList.add("clicked");
      setTimeout(() => heart.classList.remove("clicked"), 400);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <Swiper
        id="movie-slider"
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        slidesPerView={6}
        breakpoints={{
          1400: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1.4,
          },
        }}
        className="movie-swiper"
      >
        {items.map((movie) => {
          const type = movie.media_type || (movie.first_air_date ? "tv" : "movie");

          return (
            <SwiperSlide key={movie.id}>
              <div className="row-card">

                <div
                  className="fav-icon"
                  onClick={(e) => handleFavoriteToggle(e, movie, type)}
                >
                  {isFavorite(movie.id) ? (
                    <AiFillHeart className="heart filled" />
                  ) : (
                    <AiOutlineHeart className="heart outline" />
                  )}
                </div>

                <Link to={`/${type}/${movie.id}`}>
                  <img
                    src={getPoster(movie)}
                    alt={movie.title || movie.name || "Senza titolo"}
                  />
                </Link>

                <p>{movie.title || movie.name || "Titolo non disponibile"}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
