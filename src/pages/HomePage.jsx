import { useEffect, useState } from "react";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies
} from "../api/tmdb";

import MovieRow from "./MovieRow";
import "../styles/HomePage.css";

export default function HomePage() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function loadAll() {
      setPopular(await getPopularMovies());
      setTopRated(await getTopRatedMovies());
      setTrending(await getTrendingMovies());
      setUpcoming(await getUpcomingMovies());
    }
    loadAll();
  }, []);

  async function handleSearch(e) {
    const q = e.target.value;
    setSearchText(q);

    if (q.length >= 2) {
      setSearchResults(await searchMovies(q));
    } else {
      setSearchResults([]);
    }
  }

  return (
    <div className="home-container">

      {/* 🔍 Barra ricerca */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cerca un film..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Risultati ricerca */}
      {searchResults.length > 0 && (
        <MovieRow title="Risultati ricerca" movies={searchResults} />
      )}

      {/* Categorie */}
      <MovieRow title="Trending" movies={trending} />
      <MovieRow title="Popolari" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Prossime uscite" movies={upcoming} />
    </div>
  );
}
