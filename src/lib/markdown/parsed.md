# Parsed

**AI-powered document chat.** Upload PDF, DOCX, TXT, or Markdown files — ask anything about them.

Parsed extracts text, embeds it into Pinecone, and uses Google Gemini to answer questions with source citations.

---

## How it works

1. **Upload** — files go to Vercel Blob; a database row tracks the processing state.
2. **Process in the background** — an Inngest job extracts the text, splits it into chunks, embeds each chunk with `gemini-embedding-001` (768 dims), and upserts the vectors into a Pinecone index.
3. **Live status** — Pusher pushes processing updates to the browser so the user sees the file move from *uploading* to *ready* without refreshing.
4. **Chat** — each question is embedded, the closest chunks are retrieved from Pinecone (cosine similarity), and `gemini-2.0-flash` answers using only those chunks, citing the source passages.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | Better Auth (email/password + Google OAuth) |
| Database | PostgreSQL via Neon + Drizzle ORM |
| File storage | Vercel Blob |
| Vector DB | Pinecone |
| Embeddings + LLM | Google Gemini via `@ai-sdk/google` |
| Real-time | Pusher |
| Task queue | Inngest |
| Email | Resend (password reset) |

---

## Design decisions

- **Background processing** — extraction and embedding run in Inngest rather than in the request, so large documents never block the upload response or hit serverless timeouts.
- **One Gemini key for everything** — the same Google AI key powers both embeddings and answers, keeping the external dependency list short.
- **Managed services end to end** — Neon, Pinecone, Vercel Blob, Pusher, Inngest, and Resend all run on free tiers, so the whole app deploys to Vercel with no servers to operate.
