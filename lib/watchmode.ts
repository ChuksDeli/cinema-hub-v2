import type { StreamingSource, StreamingPlatformConfig } from '@/types';

const WATCHMODE_BASE = 'https://api.watchmode.com/v1';
const API_KEY = process.env.NEXT_PUBLIC_WATCHMODE_API_KEY;

export const STREAMING_PLATFORMS: Record<number, StreamingPlatformConfig> = {
  203: {
    name: 'Netflix',
    color: '#E50914',
    textColor: '#FFFFFF',
    url: (title: string) => `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
  },
  26: {
    name: 'Prime Video',
    color: '#00A8E1',
    textColor: '#FFFFFF',
    url: (title: string) => `https://www.amazon.com/s?k=${encodeURIComponent(title)}&i=instant-video`,
  },
  372: {
    name: 'Disney+',
    color: '#113CCF',
    textColor: '#FFFFFF',
    url: (title: string) => `https://www.disneyplus.com/search/${encodeURIComponent(title)}`,
  },
  371: {
    name: 'Apple TV+',
    color: '#1C1C1E',
    textColor: '#FFFFFF',
    url: (title: string) => `https://tv.apple.com/search?term=${encodeURIComponent(title)}`,
  },
  387: {
    name: 'Max',
    color: '#002BE7',
    textColor: '#FFFFFF',
    url: (title: string) => `https://www.max.com/search?q=${encodeURIComponent(title)}`,
  },
  283: {
    name: 'Crunchyroll',
    color: '#F47521',
    textColor: '#FFFFFF',
    url: (title: string) => `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`,
  },
};

export const SUPPORTED_SOURCE_IDS = [203, 26, 372, 371, 387, 283];

export async function getWatchmodeId(tmdbId: number, type: 'movie' | 'tv'): Promise<number | null> {
  try {
    const searchField = type === 'movie' ? 'tmdb_movie_id' : 'tmdb_tv_id';
    const res = await fetch(
      `${WATCHMODE_BASE}/search/?apiKey=${API_KEY}&search_field=${searchField}&search_value=${tmdbId}`
    );
    const data = await res.json();
    if (data.title_results && data.title_results.length > 0) {
      return data.title_results[0].id;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getStreamingSources(watchmodeId: number): Promise<StreamingSource[]> {
  try {
    const res = await fetch(
      `${WATCHMODE_BASE}/title/${watchmodeId}/sources/?apiKey=${API_KEY}&regions=US`
    );
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    const seen = new Set<number>();
    return data.filter((source: StreamingSource) => {
      if (!SUPPORTED_SOURCE_IDS.includes(source.source_id)) return false;
      if (source.type !== 'sub') return false;
      if (seen.has(source.source_id)) return false;
      seen.add(source.source_id);
      return true;
    });
  } catch {
    return [];
  }
}
