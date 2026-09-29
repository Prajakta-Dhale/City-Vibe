# Local Events & Experiences Platform (CityPass)

A modern, responsive, full-stack web application designed for discovering, filtering, and booking live city experiences (Music, Workshops, Sports, Food Walks, Networking, and Art Exhibitions). Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js / React Three Fiber**.

---

## Live Deployment & Repository

- **Live Demo URL**: [https://local-events-app.vercel.app](https://local-events-app.vercel.app) *(Replace with your deployed URL)*
- **GitHub Repository**: [https://github.com/your-username/local-events-app](https://github.com/your-username/local-events-app)

---

## Features

### 1. Home Page (`/`)
- **Interactive 3D Hero Banner**: Built with Three.js and `@react-three/fiber` featuring a dynamic WebGL mesh sphere with interactive orbit controls.
- **Category Explorer & Quick Filters**: One-click navigation to filtered event types.
- **Featured Experience Cards**: High-converting event previews with available seat counters and instant booking triggers.
- **Popular City Locations & CTA Section**: Dynamic city grid highlighting top venues across Mumbai, Bengaluru, and Delhi.

### 2. Events Listing Page (`/events`)
- **Multi-Variable Filtering Engine**: Real-time filtering by text search, event categories, cities, max price slider, and date/price sorting.
- **Client State Hydration**: Automatically loads and synchronizes new listings published through the Admin Dashboard using persistent browser `localStorage`.
- **Responsive Layout**: Designed for mobile, tablet, and widescreen viewports with custom responsive grid systems.

### 3. Event Details Page (`/events/[id]`)
- **Dynamic Routing**: Built with Next.js App Router dynamic route parameters (`/events/[id]`).
- **Real-Time Booking Calculation**: Dynamic pricing multiplier based on selected ticket quantity.
- **Seat Capacity Validation**: Form validation ensuring ticket requests do not exceed remaining seat capacity.

### 4. Booking Flow & Pass Generation
- **Client Form Validation**: Validates full name, email address, and phone number fields before checkout.
- **Digital Pass Modal**: Displays an instant confirmation screen with a auto-generated reference ID (`EVT-XXXXXX`) and a digital QR verification card.

### 5. Admin Management Dashboard (`/admin`)
- **Analytics Cards**: High-level overview displaying Total Events, Bookings Recorded, and Gross Revenue.
- **Full CRUD Operations**:
  - **Create**: Add new events with custom banners, dates, prices, seat limits, and venue locations.
  - **Read**: Search and filter live event listings and customer booking logs.
  - **Update**: Edit metadata and seat availability of existing events inline.
  - **Delete**: Safe removal triggers with confirmation prompts.
- **Bookings Log**: Comprehensive customer transaction ledger with reference IDs and ticket counts.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics / Animation**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Persistence**: React Hooks (`useState`, `useEffect`) + `localStorage` API

---

## Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) installed on your machine.

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/local-events-app.git](https://github.com/your-username/local-events-app.git)
   cd local-events-app