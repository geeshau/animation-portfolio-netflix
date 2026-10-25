"use client";

import { useState } from "react";
import Link from "next/link";
import VideoMetadata from "./VideoMetadata";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  channelName?: string;
  views?: number;
}

export default function VideoCard({ id, title, thumbnail, channelName, views }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/watch?v=${id}`}
      className="group relative flex-shrink-0 w-64 md:w-72 lg:w-80 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md bg-gray-900">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-40 md:h-44 lg:h-48 object-cover transition-transform duration-300 ${hovered ? "scale-110" : "scale-100"}`}
        />
        {hovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-3">
            <p className="text-white text-sm font-semibold line-clamp-2 mb-2">{title}</p>
            <VideoMetadata channelName={channelName} views={views} />
          </div>
        )}
      </div>
      {!hovered && (
        <div className="mt-2">
          <p className="text-white text-sm font-medium line-clamp-1">{title}</p>
        </div>
      )}
    </Link>
  );
}
