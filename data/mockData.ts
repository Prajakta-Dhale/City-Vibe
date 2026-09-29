import { EventItem } from "@/types";

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-1",
    title: "Neonic Beats Festival 2026",
    category: "Music",
    city: "Mumbai",
    location: "Juhu Beach Arena, Mumbai",
    date: "2026-10-15",
    time: "18:00",
    price: 1499,
    featured: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    description: "An immersive electronic music festival with top international and local DJs featuring neon lighting visualizers.",
    organizer: "Pulse Media Events",
    totalSeats: 500,
    availableSeats: 42
  },
  {
    id: "evt-2",
    title: "AI & Full-Stack Tech Summit",
    category: "Networking",
    city: "Bengaluru",
    location: "KTPO Convention Centre, Whitefield",
    date: "2026-10-20",
    time: "09:30",
    price: 499,
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Connect with developers, technical founders, and product leads to discuss the future of AI-driven web applications.",
    organizer: "DevX India",
    totalSeats: 300,
    availableSeats: 115
  },
  {
    id: "evt-3",
    title: "Artisanal Pottery & Clay Workshop",
    category: "Workshops",
    city: "Mumbai",
    location: "Kala Ghoda Art Studio, Fort",
    date: "2026-10-18",
    time: "11:00",
    price: 850,
    featured: false,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on pottery workshop guided by master ceramic artists. Materials and firing included.",
    organizer: "Earth & Hands Collective",
    totalSeats: 25,
    availableSeats: 8
  },
  {
    id: "evt-4",
    title: "Bandra Craft Beer & Smoked BBQ Fest",
    category: "Food & Drinks",
    city: "Mumbai",
    location: "Bandra Gymkhana Grounds, Bandra West, Mumbai",
    date: "2026-10-24",
    time: "16:00",
    price: 1250,
    featured: false,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800",
    description: "Sample over 15 microbrewery craft beers paired with slow-cooked smoked ribs, gourmet burgers, and live acoustic sets.",
    organizer: "Hops & Grills Co.",
    totalSeats: 300,
    availableSeats: 150
  }
];

export const getStoredEvents = (): EventItem[] => {
  if (typeof window === "undefined") return INITIAL_EVENTS;
  try {
    const stored = localStorage.getItem("app_events");
    if (!stored) {
      localStorage.setItem("app_events", JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_EVENTS;
  } catch (error) {
    console.error("Error reading events from localStorage:", error);
    return INITIAL_EVENTS;
  }
};

export const saveStoredEvents = (events: EventItem[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("app_events", JSON.stringify(events));
      // Dispatch custom event to notify other components/pages immediately
      window.dispatchEvent(new Event("eventsUpdated"));
    } catch (error) {
      console.error("Error saving events to localStorage:", error);
    }
  }
};