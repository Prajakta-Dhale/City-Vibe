export interface EventItem {
  id: string;
  title: string;
  category: string;
  city: string;
  location: string;
  date: string;
  time: string;
  price: number;
  featured: boolean;
  image: string;
  description: string;
  organizer: string;
  totalSeats: number;
  availableSeats: number;
}

export interface Booking {
  bookingId: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  ticketCount: number;
  totalPrice: number;
  createdAt: string;
}
