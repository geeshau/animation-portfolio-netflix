"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import { videos as portfolioVideos } from "@/lib/data";
import { fetchVideoData, YoutubeVideoMeta } from "@/lib/youtube";
import { getHistory } from "@/lib/history";
import Link from "next/link";

export default function Home() {
  const [videos, setVideos] = useState<YoutubeVideoMeta[]>([]);
  const [continueWatching, setContinueWatching] = useState<YoutubeVideoMeta[]>([]);

  useEffect(() => {
    const ids = portfolioVideos.map((v) => v.id);
    fetchVideoData(ids).then((data) => {
      setVideos(data);
      const history = getHistory();
      if (history?.lastWatchedId) {
        const found = data.find((d) => d.id === history.lastWatchedId);
        if (found) {
          setContinueWatching([found]);
        }
      }
    });
  }, []);

  const featured = videos[0];

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />
      {featured && (
        <section className="relative h-[60vh] md:h-[70vh] w-full">
          <img
            src={featured.thumbnail}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
          <div className="absolute bottom-20 left-6 md:left-12 max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{featured.title}</h1>
            <p className="text-gray-200 mb-6 line-clamp-3">{featured.description}</p>
            <Link
              href={`/watch?v=${featured.id}`}
              className="inline-block bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              ▶ Play
            </Link>
          </div>
        </section>
      )}
      <div className="-mt-10 relative z-10">
        {continueWatching.length > 0 && (
          <Carousel
            title="Continue Watching"
            videos={continueWatching.map((v) => ({
              id: v.id,
              title: v.title,
              thumbnail: v.thumbnail,
              channelName: v.channelName,
              views: v.views,
            }))}
          />
        )}
        <Carousel
          title="My Animation Projects"
          videos={videos.map((v) => ({
            id: v.id,
            title: v.title,
            thumbnail: v.thumbnail,
            channelName: v.channelName,
            views: v.views,
          }))}
        />
      </div>
    </main>
  );
}
