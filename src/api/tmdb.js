const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// LISTE
export async function getPopularMovies() {
  const res = await fetchJson(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  return res.results;
}

export async function getTopRatedMovies() {
  const res = await fetchJson(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  return res.results;
}

export async function getTrendingMovies() {
  const res = await fetchJson(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return res.results;
}

export async function getUpcomingMovies() {
  const res = await fetchJson(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  return res.results;
}

export async function searchMovies(query) {
  const res = await fetchJson(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  return res.results;
}

// 🔥 DETTAGLI FILM (mancava!)
export async function getMovieDetails(id) {
  return fetchJson(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
}
