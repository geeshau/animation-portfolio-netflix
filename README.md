# AnimFlix - Netflix-style Animation Portfolio

A Next.js + Tailwind CSS portfolio that showcases your YouTube animation projects with a Netflix-inspired UI.

## Features
- Netflix-style homepage with hero banner
- Horizontal carousels with hover previews
- YouTube Data API v3 integration for live view counts & channel names
- "Continue Watching" using localStorage
- Resume playback with YouTube IFrame Player API (seeks to last watched position)
- Video metadata bar (channel name + formatted view count)

## Setup
1. Copy `.env.example` to `.env.local` and add your YouTube Data API v3 key:
```bash
cp .env.example .env.local
```
2. Add your YouTube video IDs to `src/lib/config.ts` in `portfolioVideos`.
3. Install dependencies and run:
```bash
npm install
npm run dev
```

## Configuration
Edit `src/lib/config.ts` to add your projects:
```ts
export const portfolioVideos: PortfolioVideo[] = [
  { id: "YOUR_VIDEO_ID", title: "My Project", category: "Animation" },
];
```

## Notes
- If no API key is set, the app will show fallback metadata (titles/placeholders).
- History is stored in `localStorage` under key `animation_portfolio_history`.
- Open [http://localhost:3000](http://localhost:3000) to view the site.

