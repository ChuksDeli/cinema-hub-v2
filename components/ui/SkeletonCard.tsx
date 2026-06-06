export default function SkeletonCard() {
  return (
    <div className="bg-bg-card border border-border-default overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-bg-secondary" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-bg-secondary rounded w-3/4" />
        <div className="h-2 bg-bg-secondary rounded w-1/3" />
      </div>
    </div>
  );
}
