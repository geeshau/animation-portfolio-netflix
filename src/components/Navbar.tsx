"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-red-600 text-2xl font-bold tracking-tight">
            ANIMFLIX
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
            <Link href="/watch" className="hover:text-white transition-colors">Watch</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span className="hover:text-white transition-colors cursor-pointer">Portfolio</span>
        </div>
      </div>
    </nav>
  );
}
