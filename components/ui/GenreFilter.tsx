'use client';
import { motion } from 'framer-motion';
import type { Genre } from '@/types';

interface Props {
  genres: Genre[];
  activeGenre: number | null;
  onSelect: (id: number | null) => void;
}

export default function GenreFilter({ genres, activeGenre, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 text-xs font-medium tracking-widest uppercase border transition-all duration-200 ${
          activeGenre === null
            ? 'bg-accent border-accent text-white'
            : 'border-border-default text-text-secondary hover:border-border-hover hover:text-text-primary'
        }`}
      >
        All
      </motion.button>
      {genres.map((genre) => (
        <motion.button
          key={genre.id}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(genre.id)}
          className={`px-4 py-1.5 text-xs font-medium tracking-widest uppercase border transition-all duration-200 ${
            activeGenre === genre.id
              ? 'bg-accent border-accent text-white'
              : 'border-border-default text-text-secondary hover:border-border-hover hover:text-text-primary'
          }`}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
}
