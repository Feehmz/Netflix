import "./../styles/Banner.css";

export default function Banner({ item }) {
  if (!item) return null;

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : "/src/assets/no-backdrop.jpg";


  return (
    <div
      className="banner"
       style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="banner-overlay" />

      <div className="banner-content">
        <h1>{item.title || item.name}</h1>
        <p>{item.overview?.slice(0, 180)}...</p>
      </div>
    </div>
  );
}
