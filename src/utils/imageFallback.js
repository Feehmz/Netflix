
const FALLBACK = "/src/assets/no-image.jpg";

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

  if (item.poster_path) {
    return `https://image.tmdb.org/t/p/w300${item.poster_path}`;
  }

  if (item.backdrop_path) {
    return `https://image.tmdb.org/t/p/w300${item.backdrop_path}`;
  }

  return FALLBACK;
}
