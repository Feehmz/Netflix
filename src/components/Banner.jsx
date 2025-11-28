import "../styles/Banner.css";
import { getBackdrop } from "../utils/imageFallback";

export default function Banner({ item }) {
  if (!item) return null;

  // fallback automatico
  const backdrop = getBackdrop(item);

  const shortDescription =
    item.overview?.length > 180
      ? item.overview.slice(0, 180) + "..."
      : item.overview || "Nessuna descrizione disponibile.";

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <div className="banner-overlay" />

      <div className="banner-content">
        <h1>{item.title || item.name || "Titolo non disponibile"}</h1>
        <p>{shortDescription}</p>
      </div>
    </div>
  );
}
