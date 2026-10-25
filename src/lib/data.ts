import { PortfolioVideo } from "./config";

export const videos: PortfolioVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Sample Animation Reel",
    description: "Showcase of recent animation work.",
    category: "Reels"
  },
];

export function getVideos(): PortfolioVideo[] {
  return videos;
}

export function getVideoById(id: string): PortfolioVideo | undefined {
  return videos.find((v) => v.id === id);
}
