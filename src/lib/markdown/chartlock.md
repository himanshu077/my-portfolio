# ChartLock

**HIPAA-Compliant AI Medical Chart Generation Platform**

ChartLock is a cloud-native web application that enables clinicians to generate structured medical charts from voice dictation using AI. Built with HIPAA compliance at its core, ChartLock processes dictation through a PHI filter before it ever reaches the AI, and chart output is returned directly to the clinician — never stored in any database.

---

## Features

- **AI Chart Generation** — Dictate clinical notes and receive a fully structured medical chart, formatted for EMR import
- **Discharge Instructions** — Generate patient-friendly discharge instructions from a completed chart
- **PHI Protection** — All dictation is filtered for protected health information before AI processing (11+ pattern types: names, SSN, phone, email, MRN, DOB, addresses, and more)
- **Zero Chart Storage** — Charts are returned synchronously and never persisted; only job metadata (status, timing) is stored
- **EMR-Ready Output** — Charts are post-processed to remove AI preamble and Markdown formatting, producing clean plain text for direct EMR paste
- **Subscription Management** — Stripe-powered subscription plans with a self-service customer portal
- **Session Security** — Concurrent session detection and anomaly-based access controls
- **Clinical Responsibility Consent** — Users must accept a Clinical Responsibility Agreement before accessing chart generation
- **Maintenance Mode** — Toggle a maintenance page during deployments without code changes
- **Live Chat Support** — In-app Crisp chat widget

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router, static export) | 16.0.1 |
| UI | React | 19.2.0 |
| Styling | Tailwind CSS | 4 |
| Backend | Azure Functions | v4 (SDK 4.9.0) |
| Runtime | Node.js | 22.x |
| Language | TypeScript | 5.x |
| Database | Azure Cosmos DB (NoSQL) | SDK 4.9.0 |
| AI | Azure OpenAI (GPT-5.2) | SDK 2.0.0 |
| Authentication | MSAL.js (Azure Entra External ID / CIAM) | 4.28.1 |
| Payments | Stripe | 20.0.0 |
| Email | Azure Communication Services | SDK 1.1.0 |
| Telemetry | Azure Application Insights | SDK 3.12.0 |
| Hosting | Azure Static Web Apps + Azure Functions (FlexConsumption) | — |
| API Gateway | Azure API Management (APIM) | — |
| IaC | Azure Bicep | — |
| CI/CD | GitHub Actions with OIDC | — |

---

## Architecture Overview

```
Browser (Next.js SPA)
        │
        │  MSAL.js — acquires JWT from CIAM
        ▼
Azure API Management (APIM)
  ├─ JWT signature validation
  ├─ Audience / issuer / scope enforcement
  └─ Route forwarding
        │
        ▼
Azure Functions (FlexConsumption)
  ├─ Defense-in-depth token validation
  ├─ Session validation
  ├─ Consent check
  └─ HIPAA PHI filtering
        │
   ┌────┴──────────────┐
   │                   │
Cosmos DB         Azure OpenAI (GPT-5.2)
(job metadata,         │
 subscriptions,   AI Ruleset (Blob Storage)
 sessions,        (ETag-cached, 10-min TTL)
 consent,
 contacts)
```

**Key architectural decisions:**

- **Synchronous chart generation** — The function waits up to 240 seconds for the AI response and returns the chart directly. No polling, no persistent chart data.
- **APIM as the primary security layer** — All API traffic flows through API Management, which validates JWTs before forwarding to Functions.
- **Managed Identity throughout** — The Function App accesses Cosmos DB, Key Vault, Blob Storage, and Azure OpenAI using a User-Assigned Managed Identity. No secrets in code or app settings.
- **Private networking** — Functions, Cosmos DB, Storage, and OpenAI communicate over private endpoints inside a dedicated VNet. The public internet cannot reach these services directly.
- **CIAM for customer identity** — Azure Entra External ID (CIAM) handles all customer authentication. Azure Static Web Apps Easy Auth is not used (it caused redirect loops with external tenants).


---

## HIPAA Compliance

ChartLock treats HIPAA compliance as a foundational requirement:

1. **Zero PHI Storage** — Charts are never written to any database or log
2. **PHI Filter** — Dictation is scrubbed of 11+ PHI pattern types before reaching the AI
3. **Private Endpoints** — All Azure services are network-isolated; no direct public internet access
4. **Managed Identity** — No API keys or connection strings in code or configuration
5. **Audit Logging** — Application Insights telemetry is configured to exclude PHI
6. **Data Residency** — Azure Communication Services is restricted to US regions
7. **Multi-Layer Auth** — JWT validation at both APIM and Function App level (defense-in-depth)
8. **Consent Gate** — Clinical Responsibility Agreement must be accepted before chart generation is unlocked
9. **EMR-Safe Output** — Charts are stripped of Markdown formatting and AI conversational preamble before delivery

---

## Prerequisites

To build and deploy ChartLock you need:

- **Node.js** 22.x (minimum 20.9.0)
- **npm** 10+
- **Azure CLI** authenticated to your subscription
- **Azure Functions Core Tools** v4
- **Azure Static Web Apps CLI** (`npm install -g @azure/static-web-apps-cli`)
- An Azure subscription with the resources listed in the [Infrastructure](#infrastructure) section

---


## Infrastructure

Infrastructure is defined as Azure Bicep templates in `infra/`:

```
infra/
├── main.bicep          # All Azure resources
├── modules/apim.bicep  # API Management policies and routes
├── dev.bicepparam      # Dev environment parameters
└── prod.bicepparam     # Prod environment parameters
```

### Azure Resources Provisioned

| Resource | Type | Purpose |
|----------|------|---------|
| Function App | FlexConsumption (FC1) | Backend API, 0–100 instance auto-scale, 240s timeout |
| Static Web App | Standard | Frontend CDN with automatic SSL |
| Cosmos DB | NoSQL | Subscriptions, sessions, consent, job metadata, contacts |
| API Management | Developer SKU | JWT validation, routing, rate limiting |
| Key Vault | Standard | Stripe keys and secrets |
| Azure OpenAI | Cognitive Services | GPT-5.2 chart generation |
| Blob Storage — ruleset | Standard | AI ruleset (private, RBAC-only, ETag-cached) |
| Blob Storage — media | Standard | Tutorial videos (public read for VideoPlayer) |
| Blob Storage — functions | Standard | Function App deployment packages |
| Azure Communication Services | Email | Transactional and alert email |
| Application Insights | Classic | Telemetry and monitoring |
| User-Assigned Managed Identity | — | Keyless access to all Azure services |
| Virtual Network | — | Private network isolation |
| Private Endpoints | — | Cosmos DB, Storage, OpenAI, Functions |
| Private DNS Zones | — | Name resolution for private endpoints |
| Network Security Groups | — | APIM subnet traffic control |

### VNet Layout

| Subnet | CIDR | Purpose |
|--------|------|---------|
| inbound | 10.0.0.0/24 | Inbound traffic |
| outbound | 10.0.1.0/24 | Function App VNet integration |
| private-endpoints | 10.0.2.0/24 | Private endpoint NICs |
| apim | 10.0.3.0/24 | API Management |



## Repository Structure

```
chartlock-azure-app/
├── src/
│   ├── backend/           # Azure Functions API (TypeScript)
│   │   ├── functions/     # 23 HTTP endpoint handlers
│   │   ├── services/      # Business logic (Chart, Stripe, Session, Consent, etc.)
│   │   └── lib/           # Auth, HIPAA filter, OpenAI client, repositories, utilities
│   └── frontend/          # Next.js application (TypeScript)
│       ├── app/           # Pages (App Router)
│       ├── components/    # React components
│       └── lib/           # API clients, hooks, auth helpers
├── infra/                 # Bicep IaC templates
├── deploy/                # PowerShell deployment scripts
├── .github/workflows/     # GitHub Actions CI/CD pipeline
└── docs/                  # Extended documentation
```

---

## License

Copyright © TLC 1 LLC. All rights reserved. Proprietary and confidential.