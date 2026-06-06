'use client';
import { useEffect, useState } from 'react';
import { tmdb } from '@/lib/tmdb';
import type { Movie } from '@/types';
import HeroSection from '@/components/ui/HeroSection';
import MovieRow from '@/components/sections/MovieRow';

export default function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<Movie[]>([]);
  const [topRatedTV, setTopRatedTV] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [t, pm, tr, pt, trt, np] = await Promise.all([
          tmdb.getTrending('all', 'week'),
          tmdb.getPopularMovies(),
          tmdb.getTopRatedMovies(),
          tmdb.getPopularTV(),
          tmdb.getTopRatedTV(),
          tmdb.getNowPlaying(),
        ]);
        setTrending(t.results || []);
        setPopularMovies(pm.results || []);
        setTopRatedMovies(tr.results || []);
        setPopularTV(pt.results || []);
        setTopRatedTV(trt.results || []);
        setNowPlaying(np.results || []);
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return (
    <div>
      
      {!loading && trending.length > 0 && <HeroSection movies={trending.slice(0, 5)} />}
      {loading && (
        <div className="h-[85vh] min-h-[500px] bg-bg-secondary animate-pulse" />
      )}

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 space-y-14">
        <MovieRow
          title="TRENDING"
          subtitle="This week's most talked about"
          movies={trending}
          loading={loading}
          viewAllHref="/movies"
        />
        <MovieRow
          title="NOW PLAYING"
          subtitle="In theatres now"
          movies={nowPlaying}
          loading={loading}
          viewAllHref="/movies"
        />
        <MovieRow
          title="POPULAR MOVIES"
          subtitle="What everyone is watching"
          movies={popularMovies}
          loading={loading}
          viewAllHref="/movies"
        />
        <MovieRow
          title="TOP RATED FILMS"
          subtitle="The greatest of all time"
          movies={topRatedMovies}
          loading={loading}
          viewAllHref="/movies"
        />
        <MovieRow
          title="POPULAR TV SHOWS"
          subtitle="Series worth your time"
          movies={popularTV}
          loading={loading}
          viewAllHref="/tv"
        />
        <MovieRow
          title="TOP RATED SERIES"
          subtitle="The best television ever made"
          movies={topRatedTV}
          loading={loading}
          viewAllHref="/tv"
        />
      </div>
    </div>
  );
}
