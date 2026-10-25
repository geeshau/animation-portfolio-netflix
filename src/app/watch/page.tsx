"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import VideoMetadata from "@/components/VideoMetadata";
import { getHistory, saveHistory } from "@/lib/history";
import { fetchVideoData, YoutubeVideoMeta } from "@/lib/youtube";
import { videos as portfolioVideos } from "@/lib/data";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function WatchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoId = searchParams.get("v") || "";

  const playerRef = useRef<any>(null);
  const [meta, setMeta] = useState<YoutubeVideoMeta | null>(null);
  const [ready, setReady] = useState(false);
  const [upNext, setUpNext] = useState<YoutubeVideoMeta[]>([]);

  useEffect(() => {
    if (!videoId) return;
    fetchVideoData([videoId]).then((res) => {
      if (res[0]) setMeta(res[0]);
    });
    const others = portfolioVideos.filter((v) => v.id !== videoId).map((v) => v.id);
    if (others.length) {
      fetchVideoData(others).then(setUpNext);
    }
  }, [videoId]);

  useEffect(() => {
    if (!videoId) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setReady(true);
    };

    return () => {
      // cleanup not strictly necessary
    };
  }, [videoId]);

  useEffect(() => {
    if (!ready || !videoId) return;

    const history = getHistory();
    const startSeconds = history && history.lastWatchedId === videoId ? history.progress : 0;

    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      try {
        playerRef.current.loadVideoById({
          videoId,
          startSeconds,
        });
      } catch {
        // fallback
      }
      return;
    }

    if (!playerRef.current && window.YT?.Player) {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "100%",
        width: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            if (startSeconds > 0) {
              try {
                event.target.seekTo(startSeconds, true);
              } catch {}
            }
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
              try {
                const currentTime = event.target.getCurrentTime();
                const duration = event.target.getDuration();
                saveHistory({
                  lastWatchedId: videoId,
                  progress: Math.floor(currentTime),
                  timestamp: Date.now(),
                  duration,
                });
              } catch {}
            }
          },
        },
      });
    }

    // Periodic save while playing
    const interval = setInterval(() => {
      try {
        if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
          const state = playerRef.current.getPlayerState?.();
          if (state === window.YT.PlayerState.PLAYING) {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration?.() || 0;
            saveHistory({
              lastWatchedId: videoId,
              progress: Math.floor(currentTime),
              timestamp: Date.now(),
              duration,
            });
          }
        }
      } catch {}
    }, 10000);

    return () => clearInterval(interval);
  }, [ready, videoId]);

  if (!videoId) {
    return (
      <main className="bg-[#141414] min-h-screen text-white">
        <Navbar />
        <div className="pt-24 px-6 md:px-12">
          <p>No video selected. <button onClick={() => router.push("/browse")} className="text-red-500">Browse projects</button></p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />
      <div className="pt-20 px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <div className="w-full aspect-video bg-black">
              <div id="yt-player" className="w-full h-full"></div>
            </div>
            <div className="py-6 max-w-5xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{meta?.title || "Loading..."}</h1>
              <VideoMetadata channelName={meta?.channelName} views={meta?.views} />
              {meta?.description && (
                <p className="mt-4 text-gray-300 whitespace-pre-wrap leading-relaxed">{meta.description}</p>
              )}
            </div>
          </div>
          <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <h2 className="text-lg font-semibold mb-3">Up Next</h2>
            <div className="flex flex-col gap-3">
              {upNext.map((v) => (
                <Link
                  key={v.id}
                  href={`/watch?v=${v.id}`}
                  className="flex gap-3 group hover:bg-white/5 p-1 rounded"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 overflow-hidden rounded">
                    <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2 group-hover:text-white">{v.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{v.channelName}</p>
                    <p className="text-xs text-gray-500">{v.views?.toLocaleString()} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={
      <main className="bg-[#141414] min-h-screen text-white">
        <Navbar />
        <div className="pt-24 px-6 md:px-12">Loading...</div>
      </main>
    }>
      <WatchPageContent />
    </Suspense>
  );
}
