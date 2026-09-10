# ShopAI — AI-Powered E-commerce & Voice Support

A demo storefront with an AI support agent ("Sarah") that talks to customers over **text, browser voice, and phone**, understands business context, retrieves company knowledge, calls backend tools, and performs approved actions — with full admin visibility into every conversation.

Built to showcase the recurring capabilities clients ask for: real-time voice, tool calling, knowledge bases / RAG, business-system integration, multi-step workflows, logging, testing, and conversation summaries.

---

## What it does

- **Storefront** — 102 products across 10 categories, search + filters, product detail pages (highlights, specs, reviews, related products), cart, and checkout.
- **AI support agent (Sarah)** — a single ElevenLabs Conversational AI agent available over **text chat** and **browser voice** (WebRTC), with markdown-formatted replies, a typing indicator, streaming text, and a live transcript.
- **17 tools** — the agent can search the catalog and categories, read orders, modify the cart, cancel orders, check return eligibility and create returns, open support tickets, escalate to a human, and book expert consultations — all through authenticated server webhooks that **never trust a customer id from the model**.
- **Knowledge base / RAG** — six policy documents (shipping, returns, warranty, FAQ, support, privacy) uploaded to ElevenLabs and retrieved at conversation time for grounded policy answers.
- **Consultation booking** — customers can browse open slots and book/confirm/cancel, or ask Sarah to do it for them.
- **Admin console** — overview analytics, conversations (with transcripts + tool calls), tickets (with a detail modal), customers, knowledge, agent config, and a live **test suite**.
- **Persistence** — tool calls are captured live; the browser posts each chat/voice transcript to the app so conversations always appear in the admin; and a post-call webhook syncs phone transcripts + AI summaries.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components, Server Actions, Turbopack) |
| Language | TypeScript, Zod 4 |
| UI | Tailwind CSS v4, shadcn/ui, Lucide icons |
| Database | PostgreSQL (Neon) via Prisma 6 |
| AI agent | ElevenLabs Conversational AI (`@elevenlabs/react`) |

---

## Architecture at a glance

```
Browser ──► /support (text or voice)
   │            │
   │            ▼
   │      ElevenLabs Agent ──(server tool calls, signed)──► /api/ai/tools/[tool]
   │            │                                              │ verify secret + session token
   │            │                                              │ run tool → controlled services → Postgres
   │            │                                              ▼
   │            │                                         tool_calls (live capture)
   │            ├──(transcript, live)──► /api/ai/session-log ──► conversations + messages
   │            └──(phone call ends)──► /api/ai/webhooks ──► transcript + AI summary
   ▼
Storefront (products, cart, orders, consultations)  +  /admin console
```

**Security model:** identity is derived server-side from a signed session token — never from the model. Every tool webhook verifies a shared secret plus the session token before it touches the database, so the agent can only act on behalf of the customer who is actually talking to it.

---

## Agent setup is scripted

The agent, its 17 webhook tools, and the six knowledge-base documents are created from code rather than by hand in the ElevenLabs dashboard:

- `npm run kb:setup` uploads the policy docs.
- `npm run agent:setup` creates the agent and all tools, attaches the docs, and writes the agent id into `.env`.
- `npm run agent:prompt` / `agent:voice` push prompt or voice changes to the existing agent.
