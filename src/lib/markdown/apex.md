# Apex — The Racing Works

**A scroll-storytelling, award-site style single page for a fictional independent GP racing team.**

Pinned sections, a horizontal-scroll season, text masking, and image parallax. A masked wordmark filled with livery paint, a creed that inks in word by word, four circuits gliding past in a pinned horizontal reel with self-drawing track maps, parallax livery plates, and the margins that decide titles.

Built as the third of three concept sites in a client-demos series, alongside Pelagic and Solstice. Deliberately unlike the other two: a Swiss racing-poster look with alternating chalk-white and carbon-black plates, one signal red, and condensed uppercase Anton headlines over Space Grotesk body and IBM Plex Mono timing labels.

---

## The scroll tricks

- **Text masking** — the APEX wordmark is transparent text with an animated livery gradient painted inside the letterforms via `background-clip: text`.
- **Pinned word-fill** — a 280vh region pins the creed while scroll floods each word with ink, one after another.
- **Horizontal scroll** — a 420vh region whose sticky viewport translates a train of circuit chapters sideways. The travel distance is measured from the real track width, so it ends exactly on the last chapter at any screen size. Each circuit outline draws itself with an SVG `pathLength` animation on arrival.
- **Image parallax** — abstract livery plates drift at their own speeds against the scroll direction.
- Plus a signal-red lap-progress bar, timing-board marquees between plates, and a `mix-blend-difference` nav that stays legible over every section.

---

## Tech Stack

| Library | Role |
|---|---|
| **Next.js 16** (App Router, Turbopack) · TypeScript · React 19 | Framework and UI runtime |
| **Tailwind CSS 4** | Styling with `@theme` tokens |
| **motion** | All scroll choreography via `useScroll` and `useTransform` |
| **Lenis** | Smooth scroll |

Fonts via `next/font/google`: Anton · Space Grotesk · IBM Plex Mono.
