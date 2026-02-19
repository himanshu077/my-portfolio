# Snapback Returns

**AI-Powered Returns Management Platform**

Snapback Returns automates the product return process for consumers. The platform connects to a user's Gmail inbox, scans purchase receipts with OpenAI, tracks return eligibility windows across 40+ retailers, and coordinates courier pickups via DoorDash — turning a typically tedious process into a few taps in a mobile app.

---

## Features

- **AI Receipt Scanning** — Automatically scans Gmail for purchase receipts; 3-tier GPT model selection (GPT-4o / GPT-4o-mini / GPT-3.5-turbo) per vendor for cost-optimised extraction
- **40+ Vendor Support** — Vendor-specific extractors for Amazon, Apple, Sephora, Nordstrom, Target, Walmart, Lululemon, Macy's, Chewy, Shopify stores, and more; each with custom return policies and email whitelisting
- **Return Eligibility Tracking** — Daily cron job checks return windows and transitions statuses: `eligible → expiring_soon → expired → returned`; push notifications sent before deadlines
- **DoorDash Courier Pickups** — Schedule a pickup with date/time slot selection; DoorDash SDK dispatches a courier to collect the return package
- **Barcode Generation** — Return shipping barcodes generated and stored for in-person drop-off or courier handoff
- **Stripe Payments** — Delivery fee collection with payment intent creation and saved payment methods
- **Email Sync UI** — OAuth Gmail consent flow in-app; secure token storage via Expo SecureStore
- **Push Notifications** — AWS SNS + Expo push for return deadline alerts and delivery status updates
- **Klaviyo Integration** — Marketing email and SMS notifications for re-engagement campaigns
- **Real-time Updates** — Socket.io WebSocket for live scan progress and delivery status
- **React Native Mobile App** — iOS and Android app built with Expo, Expo Router file-based navigation, and tab/stack layout; PWA-capable via Expo Web

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Mobile | React Native + Expo | RN 0.76.7 / Expo 52 |
| Navigation | Expo Router (file-based) | 4.0.17 |
| UI | React Native + Expo Vector Icons | React 18.3.1 |
| Animations | React Native Reanimated | 3.16.1 |
| Language | TypeScript | 5.3.3 (mobile) / 4.1.3 (backend) |
| Backend | Node.js + Express.js | Express 4.18.2 |
| ORM | Prisma | 5.19.1 |
| Database | PostgreSQL / AWS Aurora | — |
| Cache / Tracking | AWS DynamoDB | — |
| AI / LLM | OpenAI (GPT-4o, GPT-4o-mini, GPT-3.5) | openai SDK |
| Email Scanning | Gmail API (OAuth 2.0) | — |
| Courier | DoorDash SDK | 0.6.13 |
| Payments | Stripe | 17.3.0 |
| Marketing | Klaviyo API | 8.0.2 |
| Push Notifications | AWS SNS + Expo Server SDK | Expo SDK 3.15.0 |
| Real-time | Socket.io | 4.8.1 |
| Hosting | AWS ECS Fargate (containerized) | — |
| Background Jobs | AWS Lambda | — |
| Job Queue | AWS SQS | — |
| Scheduling | AWS EventBridge (cron) | — |
| Auth | AWS Cognito + JWT | — |
| Storage | AWS S3 | — |
| Error Tracking | Sentry | 7.81.1 |
| Logging | Winston + AWS CloudWatch | 3.8.2 |

---

## Architecture Overview

```
React Native App (Expo — iOS / Android / Web)
        │
        │  JWT auth, REST API, Socket.io
        ▼
Express.js API (AWS ECS Fargate)
  ├─ Routes / Controllers (thin handlers)
  ├─ Services (business logic)
  │   ├─ products_v2      — scan orchestration
  │   ├─ scanService      — email processing
  │   ├─ productService   — CRUD + eligibility
  │   ├─ deliveryService  — DoorDash + Stripe
  │   └─ notificationSvc  — SNS + Klaviyo
  ├─ Repositories → Prisma ORM → Aurora PostgreSQL
  └─ Socket.io          — real-time scan updates
        │
   ┌────┴──────────────────────────────────┐
   │                                       │
AWS Lambda Workers                    DynamoDB
  ├─ inbox-scan-worker  (email scan)   (email cache,
  └─ daily_v2 cron      (eligibility)   scan tracking)
        │
   ┌────┴──────────────────────┐
   │                           │
Gmail API + OpenAI          DoorDash SDK + Stripe
(receipt extraction)        (pickups + payments)
```

**Key architectural decisions:**

- **3-tier AI model selection** — Vendor complexity determines which GPT model processes each receipt; premium brands (Apple, Sephora, Nordstrom) use GPT-4o for accuracy; high-volume commodity retailers (Target, Walmart) use GPT-3.5 to cut costs; all others use GPT-4o-mini as the default
- **DynamoDB for email deduplication** — Scanned email IDs are cached in DynamoDB so repeated scans of the same inbox never re-process a receipt, preventing duplicate product entries
- **Composite primary key on Products** — `[user_id, vendor_id, order_ref, name]` enforces uniqueness at the database level as a second layer of duplicate prevention
- **AWS SQS + Lambda for email workers** — Long-running inbox scans are offloaded to Lambda via SQS, keeping the ECS API responsive; EventBridge triggers the daily eligibility cron at midnight UTC
- **Vendor-specific extractors** — Each of 14+ top vendors has a hand-tuned extraction config (field mappings, prompt overrides, thumbnail matching rules) stored separately from the generic OpenAI pipeline

---

## Roles and Responsibilities

- Built the Node.js / Express.js backend on AWS ECS Fargate with Prisma ORM and Aurora PostgreSQL
- Designed the Gmail OAuth integration and email scanning pipeline with DynamoDB deduplication cache
- Implemented the 3-tier OpenAI extraction system with vendor-specific extractors for 14+ retailers and cost optimisation logic
- Built the return eligibility tracking system with daily Lambda cron, status transitions, and push notification triggers
- Integrated DoorDash SDK for courier pickup scheduling and Stripe for delivery fee payments
- Implemented Klaviyo marketing notifications and AWS SNS / Expo push notification delivery
- Built the React Native mobile app with Expo, Expo Router file-based navigation, and tab/stack layout
- Developed the pickups and returns flows — item selection, date/time slot picker, barcode display, and directions
- Set up the Gmail OAuth consent and token storage flow in the mobile app using Expo SecureStore
- Configured multi-stage Docker builds, AWS CodeBuild CI/CD, and environment-specific Sentry error tracking
