"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import { videos as portfolioVideos } from "@/lib/data";
import { fetchVideoData, YoutubeVideoMeta } from "@/lib/youtube";

export default function BrowsePage() {
  const [videos, setVideos] = useState<YoutubeVideoMeta[]>([]);

  useEffect(() => {
    const ids = portfolioVideos.map((v) => v.id);
    fetchVideoData(ids).then(setVideos).catch(() => setVideos([]));
  }, []);

  return (
    <main className="bg-[#141414] min-h-screen text-white">
      <Navbar />
      <div className="pt-24 pb-10">
        <Carousel title="All Projects" videos={videos.map((v) => ({
          id: v.id,
          title: v.title,
          thumbnail: v.thumbnail,
          channelName: v.channelName,
          views: v.views,
        }))} />
      </div>
    </main>
  );
}
