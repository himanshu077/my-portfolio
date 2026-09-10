# ElevenLabs Voice Studio

A focused Next.js demo for the four things that matter in production speech with ElevenLabs: **voice quality**, **emotion**, **pacing**, and **latency**. Tune the controls, generate, and watch a live *time-to-first-audio* metric.

---

## What this application does

Voice Studio is a browser-based **text-to-speech workbench**. You type (or load a preset) some text, choose a model and a voice, shape the delivery with emotion and pacing controls, and generate spoken audio in real time. As the audio streams back, the app measures and displays how fast the first byte arrived — so you can *hear* and *see* the trade-offs between different ElevenLabs models.

| Concern           | In the UI                                                      | ElevenLabs feature                                              |
| ----------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| **Voice quality** | Voice picker + model selector                                  | `eleven_multilingual_v2` (fidelity) vs `eleven_v3` (expressive) |
| **Emotion**       | Stability / Similarity / Style sliders, Speaker boost, v3 tags | `voice_settings` + v3 inline audio tags (`[whispers]`)          |
| **Pacing**        | Speed slider + `<break time="1.0s" />` insertion               | `voice_settings.speed` + SSML breaks                            |
| **Latency**       | Model selector + measured **time-to-first-audio**              | `eleven_flash_v2_5` (~75ms) + the streaming endpoint            |

---

## Features

- **Text-to-speech generation** — synthesize up to 5,000 characters per request, with a live character counter.
- **Live model and voice lists** — fetched from the account at runtime and merged with curated latency/quality descriptions. Models the account cannot use are shown disabled with an "unavailable" badge.
- **Emotion controls** — Stability, Similarity, and Style sliders plus a Speaker boost toggle, mapped directly to ElevenLabs `voice_settings`.
- **Pacing controls** — a Speed slider and a one-click **Insert pause** button that injects `<break time="1.0s" />` at the cursor.
- **v3 audio tags** — write inline emotion tags such as `[whispers]`, `[excited]`, `[laughs]` and hear them interpreted by the expressive model.
- **One-click presets** — Neutral narration, Excited announcement, Calm & soothing, Dramatic with pauses, Expressive v3.
- **Streaming playback + latency metrics** — audio is streamed and the app reports **time to first audio**, total time, audio size, and character count after each generation.
- **Built-in audio player** — play/pause, seekable progress, mute, and download of the generated clip.
- **Resilient by design** — the UI renders without an API key, and if the models endpoint fails it falls back to a curated list.
- **Server-side key** — the ElevenLabs API key never reaches the browser; all calls go through Next.js Route Handlers.

---

## Architecture

```
src/
├─ app/api/
│  ├─ tts/route.ts        # POST → streams synthesized audio (Node runtime)
│  ├─ voices/route.ts     # GET  → lists the account's voices (cached 60s)
│  └─ models/route.ts     # GET  → lists the account's models (cached 5m)
├─ components/tts/        # studio, selectors, emotion + pacing controls, metrics
├─ components/shared/     # audio player, labeled slider, stat card
├─ hooks/                 # use-voices, use-models, use-tts (stream read + timing)
└─ lib/                   # server-only SDK client, curated models, presets
```

**Design notes**

- **Streaming for real latency.** The TTS route uses the SDK's streaming endpoint; the client reads the response with a `ReadableStream` reader and records the timestamp of the first byte.
- **Logic in hooks, presentation in components.** `use-tts` owns fetching, stream reading, timing, and object-URL lifecycle; components stay declarative.
- **Dynamic + curated models.** The live models list drives availability, while curated metadata supplies the latency/quality badges the API doesn't provide.

---

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · lucide-react · `@elevenlabs/elevenlabs-js`
