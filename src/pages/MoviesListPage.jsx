import { useEffect, useState } from "react";
import { moviesAPI } from "../api/tmdb";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import "../styles/MoviesListPage.css";

export default function MoviesListPage() {
  const [bannerMovie, setBannerMovie] = useState(null);

  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setLoading(true);
      setError(null);

      const pop = await moviesAPI.popular();
      const top = await moviesAPI.topRated();
      const trend = await moviesAPI.trending();

      setPopular(pop.results);
      setTopRated(top.results);
      setTrending(trend.results);

      setBannerMovie(
        pop.results[Math.floor(Math.random() * pop.results.length)]
      );
    } catch (err) {
      console.error("Errore nel caricamento dei film:", err);
      setError("Impossibile caricare i film. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Caricamento...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-page">
      <Banner item={bannerMovie} />

      <div className="movies-rows">
        <MovieRow title="🔥 Film Popolari" items={popular} />
        <MovieRow title="⭐ Film Top Rated" items={topRated} />
        <MovieRow title="📈 Film in Tendenza" items={trending} />
      </div>
    </div>
  );
}
