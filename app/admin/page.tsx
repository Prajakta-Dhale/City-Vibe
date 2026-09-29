"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { INITIAL_EVENTS } from "@/data/mockData";
import { 
  Plus, Edit, Trash2, Calendar, MapPin, Tag, Users, Ticket, 
  Search, ShieldAlert, CheckCircle, X, LayoutDashboard, Sparkles, TrendingUp, Layers
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  availableSeats: number;
  organizer: string;
  description: string;
  image: string;
}

interface BookingRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  userName: string;
  userEmail: string;
  tickets: number;
  totalPrice: number;
  bookingDate: string;
}

const CATEGORIES = ["All", "Music", "Workshop", "Sports", "Food", "Networking", "Art"];

const MOCK_BOOKINGS: BookingRecord[] = [
  {
    id: "EVT-892A11",
    eventId: "1",
    eventTitle: "Mumbai Live Indie Music Fest",
    userName: "Rahul Sharma",
    userEmail: "rahul.s@example.com",
    tickets: 2,
    totalPrice: 2998,
    bookingDate: "2026-09-28"
  },
  {
    id: "EVT-443B90",
    eventId: "2",
    eventTitle: "React & Next.js Masterclass",
    userName: "Priyanka Patel",
    userEmail: "priyanka.p@example.com",
    tickets: 1,
    totalPrice: 499,
    bookingDate: "2026-09-29"
  }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"events" | "bookings">("events");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | "">(499);
  const [availableSeats, setAvailableSeats] = useState<number | "">(100);
  const [organizer, setOrganizer] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Client Mount Hydration Hook
  useEffect(() => {
    // In production, fetch your API endpoints here
    setEvents(INITIAL_EVENTS);
    setBookings(MOCK_BOOKINGS);
  }, []);

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setTitle("");
    setCategory("Music");
    setDate("");
    setTime("");
    setLocation("");
    setPrice(499);
    setAvailableSeats(100);
    setOrganizer("");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setTitle(event.title);
    setCategory(event.category);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setPrice(event.price);
    setAvailableSeats(event.availableSeats);
    setOrganizer(event.organizer);
    setDescription(event.description);
    setImage(event.image);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event listing?")) {
      setEvents(events.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      setEvents(
        events.map((evt) =>
          evt.id === editingEvent.id
            ? {
                ...evt,
                title,
                category,
                date,
                time,
                location,
                price: Number(price),
                availableSeats: Number(availableSeats),
                organizer,
                description,
                image
              }
            : evt
        )
      );
    } else {
      const newEvent: EventItem = {
        id: String(Date.now()),
        title,
        category,
        date,
        time,
        location,
        price: Number(price),
        availableSeats: Number(availableSeats),
        organizer,
        description,
        image
      };
      setEvents([newEvent, ...events]);
    }

    setIsModalOpen(false);
  };

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || evt.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredBookings = bookings.filter((bk) =>
    bk.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bk.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bk.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-indigo-50/40 text-slate-800 flex flex-col pb-20 w-full">
      <Navbar />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-8">
        
        {/* Header Section with Animated 3D Visual Badges */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-amber-200/60 shadow-xl shadow-orange-500/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-md shadow-orange-500/20 animate-pulse">
              <Sparkles className="w-4 h-4" /> Live Admin Control Panel
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Management Dashboard
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-2xl">
              Track real-time event distribution, modify catalog inventory, and oversee confirmed customer ticket sales.
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            {/* 3D Floating Icon Box */}
            <div className="hidden sm:flex items-center gap-3 bg-gradient-to-br from-orange-100 to-amber-100 p-3 rounded-2xl border border-orange-200/80 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="pr-2">
                <p className="text-xs font-bold text-orange-900 uppercase tracking-wide">System Health</p>
                <p className="text-sm font-extrabold text-slate-800">Operational 100%</p>
              </div>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white rounded-2xl text-base font-bold transition-all shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5 stroke-[3]" /> Add New Event
            </button>
          </div>
        </div>

        {/* High-Impact Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-white to-amber-50/60 border border-amber-200/80 rounded-3xl p-6 shadow-lg shadow-amber-500/5 relative overflow-hidden group hover:border-amber-300 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-amber-900/80 uppercase tracking-wider">Active Events</p>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-slate-900 mt-2">{events.length}</p>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Published live on store
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-indigo-50/60 border border-indigo-200/80 rounded-3xl p-6 shadow-lg shadow-indigo-500/5 relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-indigo-900/80 uppercase tracking-wider">Confirmed Bookings</p>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <Ticket className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black text-indigo-900 mt-2">{bookings.length}</p>
            <p className="text-xs font-semibold text-indigo-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Updated standard rate
            </p>
          </div>

          <div className="bg-gradient-to-br from-white to-emerald-50/60 border border-emerald-200/80 rounded-3xl p-6 shadow-lg shadow-emerald-500/5 relative overflow-hidden group hover:border-emerald-300 transition-all">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-emerald-900/80 uppercase tracking-wider">Total Revenue</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ₹
              </div>
            </div>
            <p className="text-4xl font-black text-emerald-700 mt-2">
              ₹ {bookings.reduce((sum, b) => sum + b.totalPrice, 0).toLocaleString()}
            </p>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Verified gateway payouts
            </p>
          </div>
        </div>

        {/* Navigation, Category Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl gap-1">
              <button
                onClick={() => setActiveTab("events")}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  activeTab === "events"
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Events List ({events.length})
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  activeTab === "bookings"
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Bookings Log ({bookings.length})
              </button>
            </div>

            {/* Search Input Box */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${activeTab} by name, venue, or reference...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Dynamic Category Pill Selection (For Events Tab) */}
          {activeTab === "events" && (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-2">Filter:</span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Events Table */}
        {activeTab === "events" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider">
                    <th className="py-4 px-6">Event Details</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Date & Schedule</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Available Seats</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold text-base">
                        No events found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-amber-50/30 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={evt.image}
                              alt={evt.title}
                              className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-sm"
                            />
                            <div>
                              <p className="font-extrabold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                                {evt.title}
                              </p>
                              <p className="text-xs text-slate-500 font-semibold">{evt.organizer}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            {evt.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-slate-900 font-bold">{evt.date}</p>
                          <p className="text-xs text-slate-500">{evt.location}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-base font-black text-slate-900">₹ {evt.price}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Users className="w-3.5 h-3.5" /> {evt.availableSeats} Left
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(evt)}
                            className="p-2.5 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 rounded-xl transition-all shadow-sm"
                            title="Edit Event"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id)}
                            className="p-2.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-xl transition-all border border-rose-100 shadow-sm"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Bookings Table */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-black uppercase tracking-wider">
                    <th className="py-4 px-6">Booking Ref</th>
                    <th className="py-4 px-6">Event Name</th>
                    <th className="py-4 px-6">Customer Profile</th>
                    <th className="py-4 px-6">Passes</th>
                    <th className="py-4 px-6">Amount Paid</th>
                    <th className="py-4 px-6">Transaction Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-semibold text-base">
                        No customer bookings matching search query.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((bk) => (
                      <tr key={bk.id} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="py-4 px-6 font-mono font-black text-indigo-600 text-base">
                          {bk.id}
                        </td>
                        <td className="py-4 px-6 font-bold text-slate-900 text-base">
                          {bk.eventTitle}
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-extrabold text-slate-900">{bk.userName}</p>
                          <p className="text-xs text-slate-500">{bk.userEmail}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-extrabold text-xs border border-indigo-100">
                            {bk.tickets} Ticket(s)
                          </span>
                        </td>
                        <td className="py-4 px-6 font-black text-emerald-700 text-base">
                          ₹ {bk.totalPrice}
                        </td>
                        <td className="py-4 px-6 text-slate-500 font-semibold text-xs">
                          {bk.bookingDate}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Form Modal: Create / Edit Event */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">
                {editingEvent ? "Update Event Details" : "Publish New Event"}
              </h2>
              <p className="text-xs font-semibold text-slate-500">Fill in event metadata for customer bookings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium">
              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Live Acoustic Concert"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                  >
                    {CATEGORIES.filter(c => c !== "All").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Organizer Name *</label>
                  <input
                    type="text"
                    required
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. Apex Productions"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Date *</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Oct 24, 2026"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Time *</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 7:00 PM IST"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Venue Location *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bandra Amphitheatre, Mumbai"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Ticket Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Total Seats *</label>
                  <input
                    type="number"
                    required
                    value={availableSeats}
                    onChange={(e) => setAvailableSeats(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Banner Image URL *</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-700 font-bold text-xs uppercase tracking-wider">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter complete overview of event experience..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-medium resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-orange-500/25"
                >
                  {editingEvent ? "Save Changes" : "Publish Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}