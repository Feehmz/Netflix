const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

async function get(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.warn("TMDB error", res.status, url);
      return null;
    }

    return res.json();
  } catch (e) {
    console.error("TMDB fetch error:", e);
    return null;
  }
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
  topRated: () => get(`${BASE}/tv/top_rated?api_key=${API_KEY}`),

  details: (id) =>
    get(`${BASE}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`),

  credits: (id) => get(`${BASE}/tv/${id}/credits?api_key=${API_KEY}`),
  videos: (id) => get(`${BASE}/tv/${id}/videos?api_key=${API_KEY}`)
};




// ======================
//   SEARCH
// ======================
export const searchAPI = {
  multi: (query) =>
    get(`${BASE}/search/multi?api_key=${API_KEY}&query=${query}`)
};

