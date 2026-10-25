export const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";

export interface PortfolioVideo {
  id: string; // YouTube video ID
  title: string;
  description?: string;
  channelName?: string;
  views?: string;
  thumbnail?: string;
  category?: string;
}

export { videos as portfolioVideos } from "./data";
export { getVideos as getPortfolioVideos, getVideoById } from "./data";


export const HISTORY_KEY = "animation_portfolio_history";
export interface WatchHistory {
  lastWatchedId: string;
  progress: number; // seconds watched
  timestamp: number;
  duration?: number;
}
