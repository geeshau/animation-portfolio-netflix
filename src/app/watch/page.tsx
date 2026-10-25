"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import VideoMetadata from "@/components/VideoMetadata";
import { getHistory, saveHistory } from "@/lib/history";
import { fetchVideoData, YoutubeVideoMeta } from "@/lib/youtube";

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

  useEffect(() => {
    if (!videoId) return;
    fetchVideoData([videoId]).then((res) => {
      if (res[0]) setMeta(res[0]);
    });
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
    if (!ready || !videoId || playerRef.current) return;
    const history = getHistory();
    const startSeconds = history && history.lastWatchedId === videoId ? history.progress : 0;

    playerRef.current = new window.YT.Player("yt-player", {
      height: "100%",
      width: "100%",
      videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,
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
          // Save progress on pause/ended
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
      <div className="pt-20">
        <div className="w-full aspect-video bg-black">
          <div id="yt-player" className="w-full h-full"></div>
        </div>
        <div className="px-6 md:px-12 py-6 max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{meta?.title || "Loading..."}</h1>
          <VideoMetadata channelName={meta?.channelName} views={meta?.views} />
          {meta?.description && (
            <p className="mt-4 text-gray-300 whitespace-pre-wrap leading-relaxed">{meta.description}</p>
          )}
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
