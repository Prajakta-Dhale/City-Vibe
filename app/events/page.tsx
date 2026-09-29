"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { INITIAL_EVENTS, getStoredEvents, EventItem } from "@/data/mockData";
import { 
  Search, Calendar, MapPin, Tag, Users, ArrowRight, Sparkles, 
  Filter, SlidersHorizontal, Heart, ShieldCheck, Mail, Phone, 
  Globe, Share2, MessageCircle, Award, HelpCircle
} from "lucide-react";

const CATEGORIES = ["All", "Music", "Workshop", "Sports", "Food", "Networking", "Art"];
const CITIES = ["All Cities", "Mumbai", "Bengaluru", "Delhi"];

export default function ExploreEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<"date" | "priceLow" | "priceHigh">("date");

  // Load events from LocalStorage on mount
  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  // Filter & Sort Logic
  const filteredEvents = events
    .filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;
      const matchesCity = selectedCity === "All Cities" || evt.location.includes(selectedCity);
      const matchesPrice = evt.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesCity && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-indigo-50/40 text-slate-800 flex flex-col justify-between w-full">
      
      {/* Navigation */}
      <div>
        <Navbar />

        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-8">
          
          {/* Header Banner */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-amber-200/60 shadow-xl shadow-orange-500/5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3 z-10 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-extrabold shadow-md shadow-orange-500/20">
                <Sparkles className="w-4 h-4" /> Discover City Experiences
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Explore Local Events
              </h1>
              <p className="text-base text-slate-600 font-medium max-w-2xl">
                Find concerts, workshops, food festivals, and sports activities near you. Filter by category, location, or price.
              </p>
            </div>
          </div>

          {/* Search, Filter & Controls Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
            
            {/* Search Bar & City Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by event title, venue, or artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:border-orange-500"
              >
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Interactive Category Selector Pills */}
            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Select Category:</p>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider & Sort Order Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 items-center">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Max Price Filter</span>
                  <span className="text-orange-600 font-extrabold text-sm">₹ {maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <span className="text-xs font-bold text-slate-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 focus:outline-none"
                >
                  <option value="date">Upcoming Date</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event Cards Grid Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">
                Showing {filteredEvents.length} Experience(s)
              </h2>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-md space-y-3">
                <p className="text-lg font-bold text-slate-700">No events matched your search filters.</p>
                <p className="text-xs text-slate-400">Try adjusting your price range, search keywords, or category filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedCity("All Cities");
                    setMaxPrice(5000);
                  }}
                  className="mt-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-amber-800 text-xs font-black px-3 py-1 rounded-full border border-amber-200/60 shadow-sm">
                          {evt.category}
                        </div>
                        <div className="absolute top-4 right-4 bg-slate-900/80 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                          ₹ {evt.price}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {evt.title}
                          </h3>
                          <p className="text-xs font-bold text-slate-500">Organized by {evt.organizer}</p>
                        </div>

                        <div className="space-y-2 text-xs font-semibold text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                            <span>{evt.date} • {evt.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="line-clamp-1">{evt.location}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {evt.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        {evt.availableSeats} Seats Available
                      </span>
                      <Link
                        href={`/events/${evt.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-transform"
                      >
                        Book Pass <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comprehensive Footer Component */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-white font-black text-2xl">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span>CityPass</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">
                Your primary portal for discovering local live music, culinary tours, workshops, and sports events. Book verified experience passes in seconds.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors" title="Website">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors" title="Social Community">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href="#" className="p-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 text-slate-300 hover:text-white transition-colors" title="Community Chat">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Event Categories */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Top Categories</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Live Concerts & Music</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Culinary & Food Walks</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Art & Exhibitions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Tech & Coding Workshops</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Sports & Outdoor Fests</a></li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-400">
                <li><Link href="/" className="hover:text-orange-400 transition-colors">Home Page</Link></li>
                <li><Link href="/events" className="hover:text-orange-400 transition-colors">Explore All Events</Link></li>
                <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Admin Dashboard</Link></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Organizer Portal</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help & Support</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter Subscription */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">Stay Updated</h4>
              <p className="text-xs text-slate-400 font-medium">Subscribe to receive weekly curated event digests directly in your inbox.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  Join Newsletter
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Trust & Copyright Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Verified Tickets • 100% Instant Confirmation</span>
            </div>
            <p>© {new Date().getFullYear()} CityPass Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}