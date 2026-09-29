import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import { INITIAL_EVENTS } from "@/data/mockData";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-12">
        <Hero3D />

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Experiences</h2>
              <p className="text-slate-400 text-sm mt-1">Handpicked local events you should not miss</p>
            </div>
            <Link
              href="/events"
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col hover:border-slate-700 transition-all duration-300 shadow-xl"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-indigo-300 text-xs px-3 py-1 rounded-full font-semibold border border-indigo-500/30">
                    {evt.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-white line-clamp-1">{evt.title}</h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2">{evt.description}</p>
                  </div>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{evt.date} • {evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-indigo-400 font-bold text-base">INR {evt.price}</span>
                    <Link
                      href={`/events/${evt.id}`}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}