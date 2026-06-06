'use client';
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { tmdb, getImageUrl } from '@/lib/tmdb';
import type { Movie } from '@/types';
import { formatRuntime, formatRating, getYear, getRatingColor, truncate } from '@/lib/utils';
import StreamingPlatforms from '@/components/ui/StreamingPlatforms';
import MovieRow from '@/components/sections/MovieRow';

export default function MovieDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    tmdb.getMovieDetails(id).then((data) => {
      if (!data || data.success === false) {
        setMovie(null);
      } else {
        setMovie(data);
      }
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DetailSkeleton />;
  if (!movie) return notFound();

  const title = movie.title || 'Unknown';
  const year = getYear(movie.release_date);
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const similar = (movie as unknown as { similar?: { results: Movie[] } }).similar?.results?.slice(0, 12) || [];
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen">
   
      <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
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
        <div className="absolute inset-0 bg-bg-primary/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{
          maskImage: 'linear-gradient(to bottom, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
          backgroundColor: '#0A0A0A',
        }} />
      </div>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
       
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="w-44 sm:w-52 md:w-64 mx-auto md:mx-0">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={title}
                  width={256}
                  height={384}
                  className="w-full border-2 border-border-default"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-bg-card border-2 border-border-default flex items-center justify-center">
                  <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 pt-2 md:pt-16"
          >
    
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-widest leading-none mb-2">
              {title}
            </h1>
            {movie.tagline && (
              <p className="text-accent text-sm italic mb-4">&ldquo;{movie.tagline}&rdquo;</p>
            )}

     
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-text-secondary text-sm">{year}</span>
              {movie.runtime && (
                <span className="text-text-secondary text-sm">{formatRuntime(movie.runtime)}</span>
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className="px-2 py-0.5 text-xs font-bold text-bg-primary"
                  style={{ backgroundColor: getRatingColor(movie.vote_average) }}
                >
                  {formatRating(movie.vote_average)}
                </div>
                <span className="text-text-muted text-xs">{movie.vote_count.toLocaleString()} votes</span>
              </div>
              {movie.status && (
                <span className="border border-border-default px-2 py-0.5 text-xs text-text-muted">{movie.status}</span>
              )}
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((g) => (
                  <span key={g.id} className="border border-border-default px-3 py-1 text-xs text-text-secondary tracking-wide">
                    {g.name}
                  </span>
                ))}
              </div>
            )}


            <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">{movie.overview}</p>

            {director && (
              <p className="text-text-secondary text-sm mb-2">
                <span className="text-text-muted mr-2">Director</span>
                <span className="text-text-primary font-medium">{director.name}</span>
              </p>
            )}


            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Trailer
              </a>
            )}
            <StreamingPlatforms tmdbId={movie.id} type="movie" title={title} />
          </motion.div>
        </div>


        {cast.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-accent" />
              <h2 className="font-display text-3xl tracking-widest text-text-primary">CAST</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {cast.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex-shrink-0 w-24 text-center"
                >
                  <div className="w-20 h-20 mx-auto bg-bg-card border border-border-default overflow-hidden mb-2">
                    {member.profile_path ? (
                      <Image
                        src={getImageUrl(member.profile_path, 'w185')}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-text-primary text-xs font-medium truncate">{member.name}</p>
                  <p className="text-text-muted text-xs truncate">{truncate(member.character, 20)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {similar.length > 0 && (
          <div className="mt-14 mb-8">
            <MovieRow title="SIMILAR FILMS" movies={similar} />
          </div>
        )}

        <div className="mt-8 mb-12">
          <Link href="/movies" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Movies
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse min-h-screen">
      <div className="h-[50vh] bg-bg-secondary" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex gap-8">
          <div className="w-64 aspect-[2/3] bg-bg-card flex-shrink-0" />
          <div className="flex-1 pt-16 space-y-4">
            <div className="h-12 bg-bg-card w-3/4" />
            <div className="h-4 bg-bg-card w-1/4" />
            <div className="h-20 bg-bg-card w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
