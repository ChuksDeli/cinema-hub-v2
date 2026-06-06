'use client';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { tmdb } from '@/lib/tmdb';
import type { Movie } from '@/types';
import MovieGrid from '@/components/ui/MovieGrid';
import SectionHeader from '@/components/ui/SectionHeader';
import { useDebounce } from '@/hooks/useDebounce';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    router.replace(`/search?q=${encodeURIComponent(debouncedQuery)}`, { scroll: false });
    tmdb.searchMulti(debouncedQuery).then((data) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filtered = (data.results || []).filter((item: any) =>
        item.media_type !== 'person' && item.poster_path
      ) as Movie[];
      setResults(filtered);
    }).finally(() => setLoading(false));
  }, [debouncedQuery, router]);

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies and TV shows..."
            autoFocus
            className="w-full bg-bg-card border border-border-default text-text-primary text-base px-5 py-4 pr-12 outline-none focus:border-accent transition-colors placeholder:text-text-muted font-body"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </motion.div>

      {loading && <MovieGrid movies={[]} loading={true} skeletonCount={10} />}

      {!loading && searched && results.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="w-16 h-16 border-2 border-border-default flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-display text-3xl text-text-primary tracking-widest mb-2">NO RESULTS</p>
          <p className="text-text-muted text-sm">Nothing found for &quot;{query}&quot;</p>
        </motion.div>
      )}

      {!loading && results.length > 0 && (
        <>
          <SectionHeader title="RESULTS" subtitle={`${results.length} results for "${query}"`} />
          <MovieGrid movies={results} />
        </>
      )}

      {!searched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="font-display text-4xl text-text-muted tracking-widest">WHAT ARE YOU LOOKING FOR?</p>
        </motion.div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 bg-bg-card animate-pulse max-w-2xl mb-10" />
        <MovieGrid movies={[]} loading={true} skeletonCount={10} />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}