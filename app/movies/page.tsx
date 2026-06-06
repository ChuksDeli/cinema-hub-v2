'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { tmdb } from '@/lib/tmdb';
import type { Movie, Genre } from '@/types';
import MovieGrid from '@/components/ui/MovieGrid';
import GenreFilter from '@/components/ui/GenreFilter';
import SectionHeader from '@/components/ui/SectionHeader';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [activeGenre, setActiveGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const fetchMovies = useCallback(async (p = 1, genre: number | null = null, sort = 'popularity.desc') => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page: p, sort_by: sort };
      if (genre) params.with_genres = genre;
      const data = await tmdb.discoverMovies(params);
      if (p === 1) {
        setMovies(data.results || []);
      } else {
        setMovies((prev) => [...prev, ...(data.results || [])]);
      }
      setTotalPages(data.total_pages || 1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tmdb.getMovieGenres().then((data) => setGenres(data.genres || []));
  }, []);

  useEffect(() => {
    setPage(1);
    fetchMovies(1, activeGenre, sortBy);
  }, [activeGenre, sortBy, fetchMovies]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchMovies(next, activeGenre, sortBy);
  };

  const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Top Rated' },
    { value: 'release_date.desc', label: 'Newest' },
    { value: 'revenue.desc', label: 'Box Office' },
  ];

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader title="MOVIES" subtitle="Browse the full catalogue" />

   
      <div className="flex items-center gap-3 mb-6">
        <span className="text-text-muted text-xs tracking-widest uppercase">Sort by</span>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`px-3 py-1 text-xs tracking-wide border transition-all ${
                sortBy === opt.value
                  ? 'bg-accent border-accent text-white'
                  : 'border-border-default text-text-secondary hover:border-border-hover hover:text-text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <GenreFilter genres={genres} activeGenre={activeGenre} onSelect={setActiveGenre} />

      <MovieGrid movies={movies} loading={loading && page === 1} />

      {page < totalPages && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={loadMore}
            className="border border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 text-sm font-medium tracking-widest uppercase transition-all"
          >
            Load More
          </button>
        </motion.div>
      )}

      {loading && page > 1 && (
        <div className="flex justify-center mt-8">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
