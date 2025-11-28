import noImage from "../assets/no-image.jpg";

const FALLBACK = noImage;

// sfondo grande (hero / banner)
export function getBackdrop(item) {
  if (!item) return FALLBACK;

  if (item.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
  }

  if (item.poster_path) {
    return `https://image.tmdb.org/t/p/original${item.poster_path}`;
  }

  return FALLBACK;
}

// poster verticale (card, dettagli, cast)
export function getPoster(item) {
  if (!item) return FALLBACK;

  // Film / serie: poster
  if (item.poster_path) {
    return `https://image.tmdb.org/t/p/w300${item.poster_path}`;
  }

  // Cast: profile_path
  if (item.profile_path) {
    return `https://image.tmdb.org/t/p/w185${item.profile_path}`;
  }

  // fallback extra: usa eventualmente il backdrop come immagine "poster"
  if (item.backdrop_path) {
    return `https://image.tmdb.org/t/p/w300${item.backdrop_path}`;
  }

  return FALLBACK;
}
