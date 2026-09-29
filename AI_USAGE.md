# AI Usage Documentation — Local Events & Experiences Platform

This document details the AI-assisted engineering process followed during the development of this project, adhering to the 6-point evaluation criteria.

---

### Record 1: 3D Hero & Interactive Navigation Component
- **AI Tool**: Gemini
- **Prompt**: *"Act as a senior React developer. Create a modern Next.js App Router hero section with a 3D animated canvas using Three.js and `@react-three/fiber`, responsive layout, and dark/light warm color theme."*
- **What AI Generated**: Initial `Hero3D.tsx` component with `@react-three/fiber` canvas and basic orbital controls mesh setup.
- **What I Changed**: Updated color parameters to match the warm high-contrast light theme, wrapped the canvas with dynamic SSR client-side loading to prevent hydration errors, and refined typography hierarchy.
- **Problems Encountered**: Server-Side Rendering (SSR) error (`window is not defined`) during Next.js build due to Three.js WebGL canvas initialization on the server.
- **How I Fixed It**: Used Next.js `dynamic()` import with `{ ssr: false }` to ensure the 3D canvas renders exclusively on the client side.

---

### Record 2: Event Filtering & Sorting Engine
- **AI Tool**: Gemini
- **Prompt**: *"Create a React custom search and filter system for an array of event objects containing title, category, city, date, and price. Include sorting by date and price."*
- **What AI Generated**: A combined filter function applying JavaScript `filter()` and `sort()` arrays.
- **What I Changed**: Added a responsive category pill selector, integrated a dynamic max-price range slider, and added empty state UI triggers when no matches are found.
- **Problems Encountered**: Sorting by date produced inconsistent results when comparing string date formats (e.g., "Oct 12, 2026").
- **How I Fixed It**: Converted date string values to standard timestamps using `new Date(evt.date).getTime()` prior to executing array comparison callbacks.

---

### Record 3: Dynamic Event Detail Page & Next.js 15 Async Params
- **AI Tool**: Gemini
- **Prompt**: *"Create a Next.js App Router dynamic event detail page at app/events/[id]/page.tsx with a booking widget, ticket counter, and confirmation modal."*
- **What AI Generated**: Standard dynamic page component expecting `params` as a synchronous object (`{ params: { id: string } }`).
- **What I Changed**: Integrated interactive seat decrement logic, added form validation banners for empty fields, and generated a random booking reference ID upon submission.
- **Problems Encountered**: Next.js 15 threw runtime warnings/errors stating that `params` is a Promise and must be unwrapped asynchronously.
- **How I Fixed It**: Updated the TypeScript interface to `{ params: Promise<{ id: string }> }` and unwrapped `params` inside the client component using React's `use()` hook (`const resolvedParams = use(params);`).

---

### Record 4: Admin Dashboard CRUD & Shared State Sync
- **AI Tool**: Gemini
- **Prompt**: *"Build an Admin Dashboard page in Next.js with state management to view, add, edit, and delete events, and display customer booking logs."*
- **What AI Generated**: An in-memory React `useState` array to handle event additions and deletions locally.
- **What I Changed**: Shifted local state handling to sync with browser `localStorage`, added modal dialog controls for adding/editing events inline, and styled high-contrast analytical metric cards.
- **Problems Encountered**: Newly created events added in the Admin Dashboard disappeared when navigating to the Explore Events page due to isolated component state.
- **How I Fixed It**: Implemented shared helper functions (`getStoredEvents()` and `saveStoredEvents()`) in `mockData.ts` using `localStorage` and called them inside client-side `useEffect` hooks across pages.