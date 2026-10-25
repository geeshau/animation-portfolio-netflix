interface VideoMetadataProps {
  channelName?: string;
  views?: number | string;
}

function formatViews(views: number | string): string {
  const n = typeof views === "string" ? Number(views) : views;
  if (isNaN(n) || n === 0) return views?.toString() || "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default function VideoMetadata({ channelName = "Unknown Channel", views = 0 }: VideoMetadataProps) {
  return (
    <div className="flex justify-between items-center pt-3 border-t border-gray-700 mt-2 text-xs md:text-sm font-semibold text-gray-400">
      <span className="hover:text-white transition-colors truncate pr-2">{channelName}</span>
      <span className="bg-gray-800 px-2 py-1 rounded whitespace-nowrap">{formatViews(views)} views</span>
    </div>
  );
}
