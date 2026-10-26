import { YOUTUBE_API_KEY } from "./config";

export interface YoutubeVideoMeta {
  id: string;
  title: string;
  description: string;
  channelName: string;
  views: number;
  thumbnail: string;
}

function formatViews(views: number): string {
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`;
  return views.toString();
}

export async function fetchVideoData(videoIds: string[]): Promise<YoutubeVideoMeta[]> {
  if (!videoIds.length) return [];
  
  if (YOUTUBE_API_KEY) {
    try {
      const ids = videoIds.join(",");
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const items = data.items || [];
        if (items.length) {
          return items.map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            channelName: item.snippet.channelTitle,
            views: Number(item.statistics?.viewCount || 0),
            thumbnail: item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
          }));
        }
      }
    } catch {}
  }

  // Fallback: scrape oEmbed for title/channel and use noembed/yt.lemnoslife or just oEmbed
  const results = await Promise.all(
    videoIds.map(async (id) => {
      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        if (res.ok) {
          const data = await res.json();
          return {
            id,
            title: data.title || "Untitled Video",
            description: "",
            channelName: data.author_name || "Unknown Channel",
            views: 0,
            thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          };
        }
      } catch {}
      return {
        id,
        title: "Untitled Video",
        description: "",
        channelName: "Unknown Channel",
        views: 0,
        thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      };
    })
  );
  return results;
}

export function formatViewCount(views: number | string): string {
  const n = typeof views === "string" ? Number(views) : views;
  if (isNaN(n)) return views.toString();
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}
