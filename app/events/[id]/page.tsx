"use client";

import { useState, use } from "react";
import Navbar from "@/components/Navbar";
import { INITIAL_EVENTS } from "@/data/mockData";
import Link from "next/link";
import { 
  Calendar, MapPin, Tag, Users, ArrowLeft, 
  ShieldCheck, CheckCircle2, Ticket, QrCode, AlertCircle, X
} from "lucide-react";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const event = INITIAL_EVENTS.find((evt) => evt.id === resolvedParams.id) || INITIAL_EVENTS[0];

  const [ticketCount, setTicketCount] = useState(1);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const totalPrice = event.price * ticketCount;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      setErrorMessage("Please complete all required contact information.");
      return;
    }

    if (ticketCount > event.availableSeats) {
      setErrorMessage("Requested ticket count exceeds remaining available seats.");
      return;
    }

    const generatedId = "EVT-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    setBookingId(generatedId);
    setIsConfirmed(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 h-80 sm:h-96 shadow-2xl">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold border border-indigo-400/30">
                  {event.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {event.title}
                </h1>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-800 text-xs">
                <div>
                  <p className="text-slate-400 font-medium">Date</p>
                  <p className="text-white font-bold mt-1">{event.date}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Time</p>
                  <p className="text-white font-bold mt-1">{event.time}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Location</p>
                  <p className="text-white font-bold mt-1 truncate">{event.location}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Organizer</p>
                  <p className="text-white font-bold mt-1 truncate">{event.organizer}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">About Experience</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Instant confirmation • Verified organizer • Secure payment checkout</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <p className="text-xs text-slate-400">Ticket Price</p>
                  <p className="text-2xl font-extrabold text-indigo-400 mt-0.5">INR {event.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Available Seats</p>
                  <p className="text-sm font-bold text-emerald-400 mt-0.5">{event.availableSeats} Left</p>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3.5 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Select Quantity</label>
                  <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl p-1.5">
                    <button
                      type="button"
                      disabled={ticketCount <= 1}
                      onClick={() => setTicketCount((prev) => Math.max(1, prev - 1))}
                      className="w-9 h-9 flex items-center justify-center bg-slate-900 text-slate-200 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-sm font-bold text-white">{ticketCount}</span>
                    <button
                      type="button"
                      disabled={ticketCount >= event.availableSeats}
                      onClick={() => setTicketCount((prev) => Math.min(event.availableSeats, prev + 1))}
                      className="w-9 h-9 flex items-center justify-center bg-slate-900 text-slate-200 rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Total Amount</span>
                  <span className="text-lg font-extrabold text-white">INR {totalPrice}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" /> Confirm & Book Pass
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {isConfirmed && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative text-center">
            <button
              onClick={() => setIsConfirmed(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="text-xs text-slate-400 mt-1">Your ticket pass has been successfully reserved.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Booking Reference</span>
                <span className="font-mono text-indigo-400 font-bold">{bookingId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Event</span>
                <span className="font-semibold text-white truncate max-w-[180px]">{event.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Holder</span>
                <span className="font-semibold text-white">{userName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Tickets Reserved</span>
                <span className="font-semibold text-white">{ticketCount} Pass(es)</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Total Paid</span>
                <span className="font-bold text-emerald-400 text-sm">INR {totalPrice}</span>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex items-center gap-4">
              <QrCode className="w-12 h-12 text-slate-300 shrink-0" />
              <p className="text-[11px] text-slate-400 text-left leading-relaxed">
                Show this digital pass or booking reference at the entry counter for validation.
              </p>
            </div>

            <Link
              href="/events"
              className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}