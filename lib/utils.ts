export function getYear(dateStr?: string): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).getFullYear().toString();
}

export function formatRuntime(minutes?: number): string {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '...';
}

export function getTitle(item: { title?: string; name?: string }): string {
  return item.title || item.name || 'Unknown';
}

export function getReleaseDate(item: { release_date?: string; first_air_date?: string }): string {
  return item.release_date || item.first_air_date || '';
}

export function getMediaType(item: { media_type?: string; title?: string; name?: string }): 'movie' | 'tv' {
  if (item.media_type === 'tv') return 'tv';
  if (item.media_type === 'movie') return 'movie';
  if (item.name && !item.title) return 'tv';
  return 'movie';
}

export function getRatingColor(rating: number): string {
  if (rating >= 7.5) return '#22C55E';
  if (rating >= 6.0) return '#F59E0B';
  return '#EF4444';
}
