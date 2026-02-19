# SmartContact AI

**AI-Powered Lead Generation & Qualification Platform**

SmartContact AI is a production SaaS platform that automates lead qualification for service businesses (plumbers, movers, contractors, HVAC, etc.) using intelligent outbound/inbound voice calls powered by Google Gemini 2.0 and SMS nurture campaigns. Admins import leads, configure AI agents per buyer, and the system handles the entire qualification funnel automatically — from first call to warm transfer or scheduled follow-up.

**Live:** [smartcontact.software](https://smartcontact.software)

---

## Features

- **AI Voice Calling** — Gemini 2.0 live streaming audio makes and receives calls with natural conversation, ~1–2s first-token response, automatic voice activity detection (VAD), and 30–60 minute session resumption for network resilience
- **SMS Nurture Campaigns** — Disposition-based SMS workflows triggered automatically after call outcomes; 8 default triggers with custom sequences per buyer
- **Cross-Channel Memory** — SMS and voice bots share conversation history at the phone level; tone and context carried between channels
- **Instant Callbacks** — "Call me now" responses from SMS trigger an outbound call within 30 seconds
- **Lead Routing & Bidding** — Auto-assignment with bid system; leads route to the right buyer based on service type, geography, and availability
- **DNC Compliance** — Built-in Do-Not-Call list management with area-code detection and validation via libphonenumber-js
- **Business Hours Enforcement** — Per-buyer timezone-aware scheduling; after-hours SMS workflows for missed windows
- **Warm Transfer** — AI announces transfer to live agent and hands off with full call context
- **Buyer Portal** — Personal dashboard for lead management, manual dialer, disposition configuration, SMS live view with human takeover, call history and transcripts
- **Knowledge Base** — Buyers upload PDF/DOCX/TXT files; AI learns service-specific details and injects them into conversations
- **Analytics** — Recharts dashboards for lead outcomes, call performance, SMS conversion, and SLA tracking
- **PWA Support** — Progressive Web App with push notifications via Serwist and Web-push

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 15.1.3 |
| UI | React | 19.2.0 |
| Styling | Tailwind CSS + Shadcn/ui | 3.4.15 |
| State / Data | TanStack React Query | 5.59.20 |
| Forms | React Hook Form + Zod | 7.53.2 / 3.23.8 |
| Charts | Recharts | 3.5.1 |
| PWA | Serwist | 9.0.0 |
| Backend | Node.js + Express.js | Express 4.21.1 |
| Language | TypeScript | 5.6.3 |
| Database | PostgreSQL via Drizzle ORM | Drizzle 0.36.4 |
| AI / LLM | Google Gemini 2.0 (live audio) | gemini-2.5-flash-native-audio-preview |
| Speech-to-Text | Google Cloud Speech-to-Text | 7.2.1 |
| Text-to-Speech | Google Cloud Text-to-Speech | 6.4.0 |
| Voice & SMS | Twilio | 4.23.0 |
| Real-time | WebSocket (ws) | 8.18.3 |
| Email | Nodemailer | 7.0.11 |
| Push Notifications | Web-push | 3.6.7 |
| Hosting | Google Cloud Run (containerized) | — |
| Database Hosting | Google Cloud SQL (PostgreSQL) | — |
| Secrets | Google Cloud Secret Manager | — |
| Job Scheduling | Google Cloud Tasks | — |
| Logging | Google Cloud Logging + Winston | — |
| Auth | JWT + bcryptjs | jsonwebtoken 9.0.2 |
| API Docs | Swagger UI | 5.0.1 |

---

## Architecture Overview

```
Browser (Next.js 15 App Router — Admin & Buyer Portals)
        │
        │  JWT auth, React Query, WebSocket client
        ▼
Express.js API (Google Cloud Run)
  ├─ Routes (thin controllers)
  ├─ Services (all business logic)
  │   ├─ leadService         — CRUD, routing, SLA
  │   ├─ callService         — Twilio call orchestration
  │   ├─ aiAgentService      — Gemini agent config
  │   ├─ conversationService — Cross-channel memory
  │   ├─ nurtureService      — SMS drip campaigns
  │   └─ postCallSmsService  — Disposition triggers
  ├─ WebSocket server        — Real-time call updates
  └─ Drizzle ORM → Cloud SQL (PostgreSQL)
        │
   ┌────┴──────────────────────────────┐
   │                                   │
Google Gemini 2.0                   Twilio
(live streaming audio,           (voice calls, SMS,
 VAD, session resumption)         webhooks, recordings)
```

**Key architectural decisions:**

- **Gemini 2.0 live audio** — Uses the native audio streaming protocol (not REST) for <2s TTFT; session tokens enable resumption after network drops without losing conversation state
- **Single schema file** — `backend/src/models/schema.ts` is the sole source of truth for all Drizzle table definitions, enums, types, and relations — nothing is duplicated
- **Service-layer pattern** — All business logic lives in `/services`; routes and controllers are thin wrappers; this keeps the AI orchestration, SMS automation, and call handling fully testable
- **Cross-channel conversation tracking** — A `conversations` table keyed by phone number ties together all voice and SMS turns, giving Gemini and the SMS bot shared context on every interaction
- **Cloud Tasks for scheduling** — Follow-up calls, nurture SMS sequences, and SLA retries are queued as Cloud Tasks rather than polling cron jobs, enabling reliable delivery and backoff

---

## Roles and Responsibilities

- Designed and built the full-stack platform from scratch — Next.js 15 frontend through Express.js backend to PostgreSQL schema
- Integrated Google Gemini 2.0 live streaming audio API for real-time conversational AI voice calls with VAD and session resumption
- Built the Twilio integration for inbound/outbound call routing, SMS send/receive, webhook event handling, and warm transfer
- Implemented the SMS nurture engine with disposition-based triggers, campaign sequences, cross-channel memory, and instant-callback on "call me now"
- Designed the PostgreSQL schema using Drizzle ORM covering leads, buyers, AI agents, conversations, call history, nurture campaigns, and knowledge base documents
- Built the buyer portal including manual dialer, SMS live view with human takeover, knowledge base uploads (PDF/DOCX parsing), and analytics dashboards
- Set up Google Cloud Run containerized deployment with Cloud SQL, Secret Manager, Cloud Tasks for scheduled jobs, and Cloud Logging
- Implemented JWT authentication, role-based access (admin vs. buyer), and BYO-Twilio support for buyers using their own phone numbers
- Built PWA support with Serwist and Web-push for push notifications on mobile devices
