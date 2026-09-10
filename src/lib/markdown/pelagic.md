# Pelagic

**An interactive single-page site for a fictional deep-sea expedition company.**

Pelagic frames scrolling as a dive. The page starts at the surface and descends to 3,800 metres, with a live depth HUD in the margin tracking the sunlight, twilight, and midnight zones and the pressure at each. Cursor-reactive bioluminescent particles drift across the dark, specimen cards tilt in 3D under the pointer, live telemetry counts up on arrival, and a dive timeline draws itself as it scrolls into view.

Built as the first of three concept sites in a client-demos series, alongside Solstice and Apex. This one is the dark, cinematic entry: near-black ocean gradients, a single cyan accent, and wide condensed uppercase headlines.

---

## What is on the page

- **Hero** — "The map ends where we begin", with a magnetic call-to-action that begins the descent.
- **Depth HUD** — a fixed gauge that reads scroll progress as metres, zone, and bar pressure.
- **Particle field** — a canvas of bioluminescent points that react to cursor movement.
- **Specimens** — 3D tilt cards for the creatures catalogued on the dive.
- **Telemetry** — live vessel stats with count-up numbers and a stat marquee.
- **Dive log** — a scroll-drawn timeline of the expedition.
- **Abyss** — the floor of the page at 3,800 m, and the contact section.

---

## How it is built

- Every section is a client component composed from small primitives: `Reveal` for scroll-triggered entrances, `CountUp` for numbers, `TiltCard` for pointer-reactive 3D tilt, and `MagneticButton` for the pull-toward-cursor buttons.
- Scroll position is read once and shared, so the HUD, timeline, and background gradient all move from the same progress value.
- The particle field is a plain canvas with its own animation loop, kept outside React state so it never triggers re-renders.

---

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion
