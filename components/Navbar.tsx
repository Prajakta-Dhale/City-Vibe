"use client";

import Link from "next/link";
import { Compass, Calendar, LayoutDashboard, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-200/60 shadow-sm transition-all">
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="p-2.5 bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 rounded-2xl shadow-md shadow-orange-500/20 group-hover:rotate-6 transition-transform">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tight text-slate-900">
            City<span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">Vibe</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-4 font-extrabold text-sm">
          <Link
            href="/events"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-orange-50 hover:bg-orange-100/80 text-orange-600 transition-all border border-orange-200/60 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="hidden sm:inline">Explore Events</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white transition-all shadow-md hover:shadow-orange-500/20"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Admin Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}