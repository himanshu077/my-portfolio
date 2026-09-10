# n8n Automation Projects

**Two production-style n8n automations built for a client, with Claude doing the reading and writing.**

Both pipelines follow the same philosophy: split every AI job into a cheap *planner/scorer*, a strong *writer*, and a cheap *checker*, so the system verifies its own work before a human ever sees it. Credentials and `.env` values are kept out of the repo; what's committed is the workflow JSON, the setup scripts, and plain-language documentation that anyone can follow.

---

## 1. LinkedIn Content Pipeline

The client wanted one LinkedIn post published every day, for 90 days, without a person having to write it each morning. They already had a 90-day content plan (topic, style, and sequence per day).

**What was built**

| Workflow | Trigger | What it does |
|---|---|---|
| Weekly Generator | Sunday 6 PM IST (+ demo button) | Writes, QA-checks, and posts the week's drafts to Slack |
| Approval Listener | Slack ✅ reaction | Turns a founder's emoji reaction into an approval in the database |
| Daily Publisher | 9 AM IST (+ demo button) | Adds today's approved post to the publish queue |
| Error Handler | Any workflow failure | Posts the error to Slack |

**The three AI steps per post (all inside the Weekly Generator):**

1. **Coordinator** (`claude-haiku-4-5`) — reads the day's topic and style and writes a brief.
2. **Writer** (a stronger Claude model) — drafts the post from the brief.
3. **Checker** (`claude-haiku-4-5`) — scores the draft against the brief; low scores are flagged before reaching Slack.

**Stack:** n8n Cloud · Claude (Anthropic) · Supabase (Postgres) · Slack · Google Sheets as a free publish queue (swappable for a real LinkedIn publisher by changing one node).

Setup scripts (`create-tables.sql`, `generate-running-order.py`, `seed-supabase.py`) create the tables and seed the 90-day plan from Excel.

---

## 2. YouTube Audience Report Pipeline

A creator pastes a **YouTube video link and an email address** into a form. About a minute later, a full **audience report** lands in four places at once — a Google Doc, an email, a row in a Google Sheet, and a Slack message with a sentiment chart.

The report says how viewers feel about the video, what they praised, what they complained about, which questions they left unanswered, and five content ideas drawn straight from the comments.

**What makes it trustworthy:** AI can invent quotes or numbers, so the pipeline **fact-checks its own report** before delivering it. A separate reviewer step verifies that every quoted comment is word-for-word real and every percentage matches the underlying counts. If something doesn't check out, the report is still delivered but clearly tagged as unreviewed.

**The three AI steps (Claude Haiku, called as raw HTTP requests because n8n has no native Anthropic node):**

1. **Score** — labels every comment: positive / neutral / negative, topic, and whether it asks a question.
2. **Write** — turns the aggregated scores into the report.
3. **Fact-check** — verifies quotes and percentages against the raw data.

**Stack:** n8n Cloud · YouTube Data API v3 · Claude (Anthropic) · Google Docs · Gmail · Google Sheets · Slack + QuickChart.

A single 19-node workflow, documented node-by-node in `BUILD_GUIDE.md` with a scaling `RUNBOOK.md` covering 500-comment batching and the reviewer retry loop.

---

## Repository layout

```
linkedin-pipeline/
  workflows/          4 n8n workflow JSON exports
  scripts/            SQL + Python one-time setup (tables, seed)
  documents/          The 90-day content plan (pipeline.xlsx)

youtube-comments-pipeline/
  BUILD_GUIDE.md      Node-by-node build with exact settings and AI request bodies
  RUNBOOK.md          Full spec: batching, retry loop, error handler, scaling
  documents/          The original client brief
```
