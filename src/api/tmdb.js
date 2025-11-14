const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

async function get(url) {
  const res = await fetch(url);
  return res.json();
}

// FILM
export const moviesAPI = {
  popular: () => get(`${BASE}/movie/popular?api_key=${API_KEY}`),
  topRated: () => get(`${BASE}/movie/top_rated?api_key=${API_KEY}`),
  trending: () => get(`${BASE}/trending/movie/week?api_key=${API_KEY}`)
};

// SERIE TV
export const tvAPI = {
  popular: () => get(`${BASE}/tv/popular?api_key=${API_KEY}`),
  trending: () => get(`${BASE}/trending/tv/week?api_key=${API_KEY}`)
};
