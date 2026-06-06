import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent flex items-center justify-center">
                <span className="font-display text-white text-xs">C</span>
              </div>
              <span className="font-display text-xl text-text-primary tracking-widest">
                CINEMA<span className="text-accent">HUB</span>
              </span>
            </div>
            <p className="text-text-muted text-sm max-w-xs">
              Discover movies and shows. Find where to stream them instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="text-text-secondary text-xs font-medium tracking-widest uppercase mb-3">Browse</p>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-text-muted hover:text-text-primary text-sm transition-colors">Home</Link>
                <Link href="/movies" className="text-text-muted hover:text-text-primary text-sm transition-colors">Movies</Link>
                <Link href="/tv" className="text-text-muted hover:text-text-primary text-sm transition-colors">TV Shows</Link>
              </div>
            </div>
            <div>
              <p className="text-text-secondary text-xs font-medium tracking-widest uppercase mb-3">Platforms</p>
              <div className="flex flex-col gap-2">
                <span className="text-text-muted text-sm">Netflix</span>
                <span className="text-text-muted text-sm">Prime Video</span>
                <span className="text-text-muted text-sm">Disney+</span>
                <span className="text-text-muted text-sm">Crunchyroll</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} CinemaHub. Built by{' '}
            <span className="text-accent font-medium">DELITECH</span>
          </p>
          <p className="text-text-muted text-xs">
            Powered by TMDB & Watchmode APIs
          </p>
        </div>
      </div>
    </footer>
  );
}
