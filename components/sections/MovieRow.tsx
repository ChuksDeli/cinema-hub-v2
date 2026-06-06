'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '@/types';
import MovieCard from '../ui/MovieCard';
import SectionHeader from '../ui/SectionHeader';
import SkeletonCard from '../ui/SkeletonCard';

interface Props {
  title: string;
  subtitle?: string;
  movies: Movie[];
  loading?: boolean;
  viewAllHref?: string;
}

export default function MovieRow({ title, subtitle, movies, loading = false, viewAllHref }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 600;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? amount : -amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative">
      <SectionHeader title={title} subtitle={subtitle} viewAllHref={viewAllHref} />
      <div className="relative group/row">
     
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 w-9 h-9 bg-bg-secondary border border-border-hover flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all opacity-0 group-hover/row:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-36 sm:w-40 md:w-44">
                  <SkeletonCard />
                </div>
              ))
            : movies.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex-shrink-0 w-36 sm:w-40 md:w-44"
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
        </div>

    
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 w-9 h-9 bg-bg-secondary border border-border-hover flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all opacity-0 group-hover/row:opacity-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
