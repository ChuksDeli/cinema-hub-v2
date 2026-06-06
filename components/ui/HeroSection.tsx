'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { getTitle, getReleaseDate, getYear, getMediaType, formatRating, truncate } from '@/lib/utils';

interface Props {
  movies: Movie[];
}

export default function HeroSection({ movies }: Props) {
  const [current, setCurrent] = useState(0);
  const featured = movies.slice(0, 5);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!featured.length) return null;

  const movie = featured[current];
  const title = getTitle(movie);
  const year = getYear(getReleaseDate(movie));
  const type = getMediaType(movie);
  const href = `/${type === 'movie' ? 'movie' : 'show'}/${movie.id}`;
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');

  return (
    <div className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
        
          <div className="absolute inset-0 bg-bg-primary/60" />
          
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-bg-primary/80" style={{
            maskImage: 'linear-gradient(to bottom, transparent, black)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          }} />
        </motion.div>
      </AnimatePresence>


      <div className="relative h-full flex items-end pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
       
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent px-3 py-0.5 text-xs font-bold tracking-widest text-white">
                  {type === 'tv' ? 'TV SERIES' : 'FILM'}
                </span>
                <span className="text-text-secondary text-sm">{year}</span>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-text-secondary text-sm">{formatRating(movie.vote_average)}</span>
                </div>
              </div>

       
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-text-primary tracking-widest leading-none mb-4">
                {title}
              </h1>

           
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                {truncate(movie.overview, 180)}
              </p>

       
              <div className="flex flex-wrap items-center gap-4">
                <Link href={href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 font-medium tracking-wide text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </motion.button>
                </Link>
                <Link href={href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 border border-text-secondary hover:border-text-primary text-text-secondary hover:text-text-primary px-6 py-3 font-medium tracking-wide text-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    More Info
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


      <div className="absolute bottom-6 right-8 flex gap-1.5">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 ${
              i === current ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-text-muted hover:bg-text-secondary'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
