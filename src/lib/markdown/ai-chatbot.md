# AI Chatbot

**A full-stack ChatGPT-style chat application built with Next.js.**

Streams responses from Groq-hosted models through the Vercel AI SDK, with Google sign-in, persistent conversations, and a shadcn/ui interface.

---

## Features

- **Streaming chat** — responses stream token by token using the Vercel AI SDK.
- **Google authentication** — sign in with Google via Auth.js v5.
- **Conversation history** — chats are saved per user in PostgreSQL through Prisma.
- **Fast inference** — powered by Groq's LPU-hosted open models.
- **Lightweight state** — Zustand keeps client state simple and predictable.

---

## Tech Stack

| Piece | Purpose |
|---|---|
| **Next.js 14** | React framework for the server-rendered app and API routes |
| **Vercel AI SDK** | AI chat streaming on both server and client |
| **Groq** | LLM inference API |
| **Auth.js v5** | Google authentication |
| **Prisma** + **PostgreSQL** (Neon) | Persisting users and conversations |
| **Zustand** | Minimal state management |
| **shadcn/ui** + **Tailwind CSS** | UI components and styling |

---

## Running locally

```bash
git clone https://github.com/himanshu064/ai-chatbot.git
cd ai-chatbot
npm install
npm run prisma-generate
npm run dev
```

Requires Node.js 20.9+, a `DATABASE_URL`, Google OAuth credentials, and a `GROQ_CLOUD_API_KEY` in `.env`.
