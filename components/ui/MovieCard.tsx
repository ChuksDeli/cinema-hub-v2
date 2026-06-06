'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { getTitle, getReleaseDate, getYear, getMediaType, formatRating, getRatingColor } from '@/lib/utils';

interface Props {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: Props) {
  const [imageError, setImageError] = useState(false);
  const title = getTitle(movie);
  const year = getYear(getReleaseDate(movie));
  const type = getMediaType(movie);
  const href = `/${type === 'movie' ? 'movie' : 'show'}/${movie.id}`;
  const posterUrl = getImageUrl(movie.poster_path, 'w342');
  const rating = movie.vote_average;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={href} className="block group">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="relative bg-bg-card border border-border-default overflow-hidden"
        >

          <div className="relative aspect-[2/3] overflow-hidden bg-bg-secondary">
            {posterUrl && !imageError ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
            )}


            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-bg-primary/80 flex flex-col items-center justify-center gap-3 p-3"
            >
              <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center">
                <svg className="w-5 h-5 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-display text-sm tracking-widest text-text-primary text-center">VIEW DETAILS</span>
            </motion.div>


            <div
              className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-bg-primary"
              style={{ backgroundColor: getRatingColor(rating) }}
            >
              {formatRating(rating)}
            </div>

            <div className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium tracking-widest bg-bg-primary/80 text-text-secondary">
              {type === 'tv' ? 'TV' : 'FILM'}
            </div>
          </div>


          <div className="p-3">
            <h3 className="text-text-primary text-sm font-medium truncate group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-text-muted text-xs mt-0.5">{year}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
