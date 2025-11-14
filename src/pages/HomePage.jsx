import { useEffect, useState } from "react";
import { moviesAPI, tvAPI } from "../api/tmdb";
import Banner from "../components/Banner";
import MovieRow from "../components/MovieRow";
import "../styles/HomePage.css";

export default function HomePage() {
  const [bannerItem, setBannerItem] = useState(null);

  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);

  const [tvPopular, setTvPopular] = useState([]);
  const [tvTrending, setTvTrending] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const pop = await moviesAPI.popular();
    setPopular(pop.results);

    const top = await moviesAPI.topRated();
    setTopRated(top.results);

    const trend = await moviesAPI.trending();
    setTrending(trend.results);

    const tvp = await tvAPI.popular();
    setTvPopular(tvp.results);

    const tvt = await tvAPI.trending();
    setTvTrending(tvt.results);

    // Film random nel banner
    setBannerItem(pop.results[Math.floor(Math.random() * pop.results.length)]);
  }

  return (
    <div className="home">
      <Banner item={bannerItem} />

      <div className="home-rows">
        <MovieRow title="🔥 Popolari" items={popular} />
        <MovieRow title="⭐ Top Rated" items={topRated} />
        <MovieRow title="📈 In Tendenza" items={trending} />

        <MovieRow title="📺 Serie TV Popolari" items={tvPopular} type="tv" />
        <MovieRow title="✨ Serie TV in Tendenza" items={tvTrending} type="tv" />
      </div>
    </div>
  );
}
