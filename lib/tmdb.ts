const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB fetch failed: ${res.status}`);
  return res.json();
};

export const tmdb = {
  getTrending: (mediaType: 'movie' | 'tv' | 'all' = 'all', timeWindow: 'day' | 'week' = 'week') =>
    fetcher(`${TMDB_BASE}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}`),

  getPopularMovies: (page = 1) =>
    fetcher(`${TMDB_BASE}/movie/popular?api_key=${API_KEY}&page=${page}`),

  getTopRatedMovies: (page = 1) =>
    fetcher(`${TMDB_BASE}/movie/top_rated?api_key=${API_KEY}&page=${page}`),

  getNowPlaying: (page = 1) =>
    fetcher(`${TMDB_BASE}/movie/now_playing?api_key=${API_KEY}&page=${page}`),

  getUpcoming: (page = 1) =>
    fetcher(`${TMDB_BASE}/movie/upcoming?api_key=${API_KEY}&page=${page}`),

  getPopularTV: (page = 1) =>
    fetcher(`${TMDB_BASE}/tv/popular?api_key=${API_KEY}&page=${page}`),

  getTopRatedTV: (page = 1) =>
    fetcher(`${TMDB_BASE}/tv/top_rated?api_key=${API_KEY}&page=${page}`),

  getAiringTodayTV: (page = 1) =>
    fetcher(`${TMDB_BASE}/tv/airing_today?api_key=${API_KEY}&page=${page}`),

  getMovieDetails: (id: number) =>
    fetcher(`${TMDB_BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`),

  getTVDetails: (id: number) =>
    fetcher(`${TMDB_BASE}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`),

  searchMulti: (query: string, page = 1) =>
    fetcher(`${TMDB_BASE}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`),

  discoverMovies: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams({ api_key: API_KEY || '', ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
    return fetcher(`${TMDB_BASE}/discover/movie?${query}`);
  },

  discoverTV: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams({ api_key: API_KEY || '', ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) });
    return fetcher(`${TMDB_BASE}/discover/tv?${query}`);
  },

  getMovieGenres: () =>
    fetcher(`${TMDB_BASE}/genre/movie/list?api_key=${API_KEY}`),

  getTVGenres: () =>
    fetcher(`${TMDB_BASE}/genre/tv/list?api_key=${API_KEY}`),
};
