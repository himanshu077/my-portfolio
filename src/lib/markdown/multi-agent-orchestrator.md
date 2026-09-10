# Multi-Agent Orchestrator

**A proof of concept that shows how a multi-agent AI pipeline works.**

One orchestrator agent takes a goal, splits it into smaller tasks, hands each task to a worker agent running in parallel, and a final step merges the workers' output into a single result. The web page shows every stage as it happens.

```
              ┌──────────────┐
              │ Orchestrator │   plans the work
              └──────┬───────┘
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ Agent 1 │  │ Agent 2 │  │ Agent 3 │   work in parallel
   └────┬────┘  └────┬────┘  └────┬────┘
        └────────────┼────────────┘
                     ▼
              ┌──────────────┐
              │    Result    │   merged answer
              └──────────────┘
```

---

## What the demo shows

- **Live pipeline diagram.** Each node changes state as work happens: waiting, working, done, or failed.
- **Agent status.** How many agents are running, what task each one has, and its output streaming in as it works.
- **Activity log.** A timestamped list of everything that happened in the run.
- **Vendor choice from the UI.** Pick OpenAI, Gemini, or Claude and paste a key with the Add API key button. The page always shows which cheapest-tier model is in use and its price.
- **Final result.** A Show result button opens the merged answer full screen, with total time, tokens used, and estimated cost. The view lives at `?result=<run id>`, so the link can be shared.
- **Run history.** Past runs are saved in Postgres and can be reopened at any time.

---

## Tech Stack

Everything runs in one Next.js app. There is no separate backend service.

| Piece | What it does here |
|---|---|
| **Next.js 16** (App Router) | Serves the page, the API routes, and the live event stream |
| **React 19** + **TypeScript 5** | Renders the page; event shapes are typed end to end |
| **Tailwind CSS 4** + **shadcn/ui** | Styling and accessible components |
| **React Flow** (`@xyflow/react`) | Draws the orchestrator, agent, and result nodes with animated edges |
| **Vercel AI SDK v7** | One set of functions for streaming text and structured JSON from any vendor |
| **@ai-sdk/openai / google / anthropic** | Direct vendor adapters — `gpt-5-nano`, `gemini-2.5-flash-lite`, `claude-haiku-4-5` |
| **zod** | Defines the task list the orchestrator must return as a JSON schema |
| **PostgreSQL** + **Drizzle ORM** | Stores runs, agent tasks, and the event log |

Each adapter calls the vendor directly. There is no middleman such as OpenRouter, so there is no extra fee and the demo can honestly say which vendor handled a run.

---

## How the pieces talk to each other

```
Browser                          Server (Next.js route handlers)              Vendors
-------                          --------------------------------             -------
Goal + vendor + key  --POST-->   /api/runs
                                   create run row  ------------------>  Postgres
                                   orchestrator (generateObject) ---->  OpenAI / Gemini / Claude
                                   agents in parallel (streamText) -->  OpenAI / Gemini / Claude
                                   synthesizer (streamText) --------->  OpenAI / Gemini / Claude
Diagram updates   <--SSE stream--  every event, as it happens
                                   save tasks, events, result  ------>  Postgres
Show result       --GET-------->   /api/runs/{id}  <-------------------  Postgres
```

Server-Sent Events (SSE) is a plain HTTP response that stays open and sends one small message per event. The browser reads it with `fetch`, so no extra library is needed on either side.
