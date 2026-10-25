"use client";

import { useRef } from "react";
import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName?: string;
  views?: number;
}

interface CarouselProps {
  title: string;
  videos: Video[];
}

export default function Carousel({ title, videos }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!videos.length) return null;

  return (
    <section className="mb-10 px-6 md:px-12">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">{title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-r hidden group-hover:block"
          aria-label="Scroll left"
        >
          ‹
        </button>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-l hidden group-hover:block"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
