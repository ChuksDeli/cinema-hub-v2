import type { Movie } from '@/types';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

interface Props {
  movies: Movie[];
  loading?: boolean;
  skeletonCount?: number;
}

export default function MovieGrid({ movies, loading = false, skeletonCount = 20 }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={i} />
      ))}
    </div>
  );
}
