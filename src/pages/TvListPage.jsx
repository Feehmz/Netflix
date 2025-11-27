import { useEffect, useState } from "react";
import { tvAPI } from "../api/tmdb";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";

import "../styles/TvListPage.css";

export default function TvListPage() {
  const [bannerItem, setBannerItem] = useState(null);

  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const pop = await tvAPI.popular();
      const trend = await tvAPI.trending();
      const top = await tvAPI.topRated?.(); // ← se non esiste ancora, aggiungiamo dopo

      setPopular(pop?.results || []);
      setTrending(trend?.results || []);
      setTopRated(top?.results || []);

      // Banner random serie TV
      const source = pop?.results || trend?.results || [];
      if (source.length > 0) {
        setBannerItem(source[Math.floor(Math.random() * source.length)]);
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <h2 className="loading">Caricamento...</h2>;

  return (
    <div className="tv-list-page fade-in">

      {/* Banner */}
      {bannerItem && <Banner item={bannerItem} />}

      <h1 className="page-title">📺 Serie TV</h1>

      <MovieRow title="🔥 Popolari" items={popular} />
      <MovieRow title="⭐ Top Rated" items={topRated} />
      <MovieRow title="📈 In Tendenza" items={trending} />

    </div>
  );
}
