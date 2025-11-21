const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

// funzione GET generica
async function get(url) {
  const res = await fetch(url);
  return res.json();
}

// ======================
//   FILM
// ======================
export const moviesAPI = {
  popular: () => get(`${BASE}/movie/popular?api_key=${API_KEY}`),
  topRated: () => get(`${BASE}/movie/top_rated?api_key=${API_KEY}`),
  trending: () => get(`${BASE}/trending/movie/week?api_key=${API_KEY}`),
  details: (id) => get(`${BASE}/movie/${id}?api_key=${API_KEY}`),
  credits: (id) => get(`${BASE}/movie/${id}/credits?api_key=${API_KEY}`),
  videos: (id) => get(`${BASE}/movie/${id}/videos?api_key=${API_KEY}`)
};


// ======================
//   SERIE TV
// ======================
export const tvAPI = {
  popular: () => get(`${BASE}/tv/popular?api_key=${API_KEY}`),
  trending: () => get(`${BASE}/trending/tv/week?api_key=${API_KEY}`),
  details: (id) => get(`${BASE}/tv/${id}?api_key=${API_KEY}`),
};

// ======================
//   SEARCH
// ======================
export const searchAPI = {
  multi: (query) =>
    get(`${BASE}/search/multi?api_key=${API_KEY}&query=${query}`),
};
