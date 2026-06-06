'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWatchmodeId, getStreamingSources, STREAMING_PLATFORMS } from '@/lib/watchmode';
import type { StreamingSource } from '@/types';

interface Props {
  tmdbId: number;
  type: 'movie' | 'tv';
  title: string;
}

export default function StreamingPlatforms({ tmdbId, type, title }: Props) {
  const [sources, setSources] = useState<StreamingSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSources() {
      try {
        setLoading(true);
        const watchmodeId = await getWatchmodeId(tmdbId, type);
        if (!watchmodeId) {
          setSources([]);
          return;
        }
        const fetchedSources = await getStreamingSources(watchmodeId);
        setSources(fetchedSources);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSources();
  }, [tmdbId, type]);

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="font-display text-2xl tracking-widest text-text-primary mb-4">WHERE TO WATCH</h3>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-32 h-10 bg-bg-card border border-border-default animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || sources.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="font-display text-2xl tracking-widest text-text-primary mb-4">WHERE TO WATCH</h3>
        <div className="border border-border-default p-4">
          <p className="text-text-muted text-sm">
            Not currently available on supported streaming platforms.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(STREAMING_PLATFORMS).map(([id, platform]) => (
              <a
                key={id}
                href={platform.url(title)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:underline"
              >
                Search on {platform.name} →
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="font-display text-2xl tracking-widest text-text-primary mb-4">WHERE TO WATCH</h3>
      <div className="flex flex-wrap gap-3">
        {sources.map((source, i) => {
          const platform = STREAMING_PLATFORMS[source.source_id];
          if (!platform) return null;
          return (
            <motion.a
              key={source.source_id}
              href={platform.url(title)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ backgroundColor: platform.color }}
              className="flex items-center gap-2 px-5 py-2.5 font-medium text-sm tracking-wide transition-all"
            >
              <span style={{ color: platform.textColor }}>{platform.name}</span>
              <svg
                className="w-3.5 h-3.5"
                style={{ color: platform.textColor }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          );
        })}
      </div>
      <p className="text-text-muted text-xs mt-3">
        * Clicking redirects to search results on each platform.
      </p>
    </div>
  );
}
