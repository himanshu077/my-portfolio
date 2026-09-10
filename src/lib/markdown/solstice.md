# Solstice — Halo One

**A single-page product site with a true WebGL 3D scene.**

Halo One is a levitating sculptural lamp: a hand-blown glass orb held mid-air over a walnut maglev base by three copper halos. The whole page is a live 3D scene. Drag to orbit the lamp, scroll to pull it apart and sweep its light from candle-warm to daylight, then reserve one of a numbered run of 500.

Built as the second of three concept sites in a client-demos series, alongside Pelagic and Apex. Deliberately the opposite of Pelagic's dark abyss: a warm porcelain and copper palette, light theme, and a contemporary-luxury type pairing of Playfair Display headlines over Inter body with DM Mono labels.

---

## How the 3D works

- **Fixed full-viewport canvas** behind the DOM. Procedural studio lighting via `Environment` and `Lightformer`, so there are no runtime HDR downloads. `PresentationControls` gives drag-to-orbit.
- **The product is built entirely from primitives**: a transmission-glass orb, an emissive filament core, three copper torus halos, and a walnut maglev base. No external models.
- **Scroll drives the choreography.** A `useFrame` loop reads scroll progress from a mutable store written by Lenis and read at 60 fps, with no React re-renders, and moves position, exploded view, and colour temperature through keyframe tracks.
- **DOM sections scroll over the canvas** with pointer events disabled, so drags fall through to the 3D scene while links opt back in.

**Scroll choreography:** hero (assembled, right) → craft (drifts left, halos fly apart) → modes (reassembles, filament sweeps 2,200 K to 5,600 K) → specs (shrinks behind a frosted plate) → coda (returns with an ember glow).

---

## Tech Stack

| Library | Role |
|---|---|
| **Next.js 16** (App Router, Turbopack) · TypeScript · React 19 | Framework and UI runtime |
| **Tailwind CSS 4** | Styling with `@theme` tokens |
| **three.js** | WebGL |
| **@react-three/fiber** | React renderer for three.js |
| **@react-three/drei** | Float, MeshTransmissionMaterial, Environment, ContactShadows, Sparkles, PresentationControls |
| **motion** | DOM reveal animations |
| **Lenis** | Smooth scroll and scroll-progress feed |

Fonts via `next/font/google`: Playfair Display · Inter · DM Mono.
