# Orqestra

**An Agentic AI Operations Platform**

Give an AI *team* a plain-English business objective — *"find high-value customers at risk of churn and prepare recovery outreach"* — and a **Manager** agent plans it, **delegates** to specialist agents, they use real tools against your business data, and you get back a structured report plus any sensitive actions queued for **your approval**. Every run streams live and is fully traceable.

It is a **platform, not one hardcoded workflow**: the same machinery runs churn analysis, invoice recovery, sales reporting, and more — driven entirely by the objective you type.

---

## Highlights

- **Multi-agent orchestration** — a Manager LLM delegates to **Data Analyst**, **Research**, and **Communication** specialists (agent-as-tool pattern), streamed live over SSE.
- **Bring-your-own-key** — configure OpenAI, Anthropic, or Google in Settings; keys are **AES-256-GCM encrypted at rest**. Claude users can add a separate OpenAI/Google key just for embeddings.
- **RAG over pgvector** — upload PDF/DOCX/TXT → chunk → embed → semantic search, all inside the same Postgres (no separate vector DB).
- **Human-in-the-loop approvals** — sensitive actions (send email, create CRM task) are deferred for review, executed **at-most-once**, and written to an **immutable audit log**. Real email sending via Resend (mocked without a key).
- **Guardrails** — hard ceilings on steps / tool-calls / agent-hops / per-tool timeout / per-run budget stop runaway runs with a clear reason.
- **Observability & cost** — full execution-trace viewer, per-model cost tracking (today / month), and an analytics dashboard.
- **Demo scenarios & templates** — one-click Customer Recovery, Invoice Recovery, and Executive Reporting, plus a template picker.

---

## Tech Stack

| Area      | Choice                                                             |
| --------- | ------------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, Turbopack) · TypeScript · React 19         |
| UI        | Tailwind CSS v4 · shadcn / Base UI · lucide-react                  |
| AI        | Vercel AI SDK v7 (`generateText` / `generateObject` / `embedMany`) |
| Data      | Drizzle ORM · Neon serverless Postgres · **pgvector**              |
| Auth      | Auth.js (NextAuth v5) — Credentials + JWT, DAL-guard pattern       |
| Testing   | Vitest (unit + live-DB integration)                                |

---

## Demo Scenarios

| Scenario            | Agents                                    | What it shows                                  |
| ------------------- | ----------------------------------------- | ---------------------------------------------- |
| Customer Recovery   | Manager · Data Analyst · Research · Comms | 42 high-value accounts at risk · $184,500 ARR  |
| Invoice Recovery    | Manager · Data Analyst · Research · Comms | Overdue invoices > $5,000 · drafts + approvals |
| Executive Reporting | Manager · Data Analyst · Research         | Quarterly sales performance summary            |

---

## Project Structure

```
app/(app)/            Guarded pages (dashboard, agent, tasks, approvals, knowledge, activity, analytics, audit, settings)
app/api/              SSE agent stream, auth, documents
src/ai/               Agents, tools, provider layer, guardrails, prompts, pricing, events
src/services/         Business logic (runs, analytics, approvals, run-recorder, documents, email, audit)
src/db/schema/        Drizzle schema (20 tables) + migrations in /drizzle
src/components/       UI (ui/ primitives, runs/, agent/, approvals/, audit/, knowledge/, settings/, layout/, charts/)
```

---

## Key Design Decisions

- **Agent-as-tool pattern** — specialists are exposed to the Manager as callable tools, so delegation is just another tool call and the whole run is one traceable tree.
- **Approvals are at-most-once** — a deferred action can only be executed a single time, and every decision lands in an append-only audit table.
- **Everything in one Postgres** — business data, run history, embeddings (pgvector), and audit log share a single database, which keeps the deployment to one Neon instance plus Vercel.
