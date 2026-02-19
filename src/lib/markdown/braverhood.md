# Braverhood

**HIPAA-Compliant Healthcare Management & Billing Platform**

Braverhood (HIHFS — Healthcare Information & Human Fiscal Services) is a comprehensive, cloud-native healthcare management platform built for providers serving individuals with developmental disabilities and special needs. The system handles end-to-end operations — from individual care management and staff coordination to time tracking, Electronic Visit Verification (EVV), automated billing, and payroll processing — within a fully HIPAA-compliant AWS serverless architecture.

---

## Features

- **Individual & Care Management** — Comprehensive patient records with medical history, service authorizations, document management, and family/designee relationships
- **Staff Management** — Staff profiles with credentials, hierarchical organization, caseload tracking, and role-based access control
- **Time Tracking & Billing** — Electronic timepunch entry (manual, bulk CSV, phone system), multi-level approval workflows, automated billing calculations with retroactive rate adjustments
- **Electronic Visit Verification (EVV)** — Real-time and batch submission integration with NY State eMedNY system
- **Payroll Processing** — Complex payroll with overtime, differentials, and asynchronous batch processing via SQS
- **Program & Budget Management** — Multi-program support, budget tracking, service authorization validation, and broker coordination
- **Multi-Portal Architecture** — Separate admin portal (full management) and parent portal (secure family access) from a shared Nx monorepo
- **Document OCR** — AWS Textract integration for automatic text extraction from uploaded PDFs and images
- **Phone System Integration** — Twilio IVR for staff to clock in/out via phone, voice notifications
- **PDF & Reporting** — Server-side and client-side PDF generation for invoices, payroll summaries, and compliance reports
- **Audit Logging** — Every database operation logged with user context, timestamp, and IP for HIPAA compliance

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Angular (Nx monorepo) | 8.2.x |
| State Management | NgRx Store + Effects + Entity | 8.3.0–8.6.1 |
| UI Components | Angular Material, ag-Grid, ngx-charts | 8.2.x / 23.2.1 / 16.0.0 |
| Language | TypeScript | 3.4.5 |
| Backend | Node.js + Express.js on AWS Lambda | Express 4.15.2 |
| Business Logic | @rafischechter/hihfs_bl (npm package) | v2.4.82 |
| Database | Amazon Aurora RDS (MySQL) via RDS Data API | aws-sdk 2.1692.0 |
| Authentication | AWS Cognito + JWT | jsonwebtoken 9.0.2 |
| Storage | Amazon S3 (encrypted) | — |
| API Gateway | AWS API Gateway (3 separate APIs) | — |
| Async Processing | Amazon SQS | — |
| OCR | AWS Textract | @aws-sdk/client-textract 3.218.0 |
| Transcription | AWS Transcribe | @aws-sdk/client-transcribe 3.682.0 |
| Phone System | Twilio (via @rafischechter/phone-system) | 4.23.0 |
| Email | Handlebars templates | 4.7.6 |
| PDF Generation | pdfmake + pdf-lib + pdfkit | 0.1.72 / 1.17.1 / 0.11.0 |
| Hosting & CI/CD | AWS Amplify + CloudFront | — |
| IaC | AWS CloudFormation | — |
| Error Tracking | Airbrake | @airbrake/browser 1.1.2 |

---

## Architecture Overview

```
Browser (Angular SPA — Admin & Parent Portals)
        │
        │  AWS Amplify — Cognito JWT auth
        ▼
AWS API Gateway (3 separate APIs)
  ├─ hihfsApplicationLayerAPI  (admin)
  ├─ hihfsParentAPI            (parent portal)
  └─ hihfsPhoneSystemAPI       (Twilio IVR)
        │
        ▼
AWS Lambda Functions
  ├─ hihfsappserverfunction    (main Express.js handler)
  ├─ hihfsQueueEventsHandler   (SQS async job processor)
  ├─ Scheduled jobs            (daily, half-hourly, weekly)
  └─ Cognito triggers          (pre-signup, custom messages)
        │
   ┌────┴────────────────────────┐
   │                             │
Aurora RDS (Data API)        Amazon SQS
(individuals, staff,         ├─ Textract OCR jobs
 timepunches, billing,       ├─ EVV batch submissions
 payroll, programs)          ├─ Billing calculations
                             └─ Payroll processing
```

**Key architectural decisions:**

- **Published business logic package** — All backend logic is encapsulated in `@rafischechter/hihfs_bl`, published to GitHub Package Registry and consumed by every Lambda function, ensuring a single source of truth for business rules
- **RDS Data API** — Aurora is accessed exclusively through AWS's serverless Data API, eliminating connection pool management and cold-start overhead in Lambda
- **SQS async processing** — Long-running operations (billing, payroll, EVV batch, OCR) are queued and processed by a dedicated Lambda, avoiding API Gateway timeouts
- **Nx monorepo** — Admin portal and parent portal share 80% of code through `shared-ui` component library and `datatypes` TypeScript interfaces, with independent deployment cycles
- **NgRx state management** — Centralized Redux-style store with entity adapters and facade pattern handles highly interconnected healthcare data (individuals, staff, timepunches, billing, programs)

---

## HIPAA Compliance

1. **Comprehensive Audit Logging** — Every SQL query is wrapped in an audit layer (db.commands.ts) that captures who, what, when, where, and why for every database operation
2. **Role-Based Access Control** — Cognito user groups (SuperAdmin, Administrator, BillingStaff, Staff, Parent) enforced at API Gateway and middleware level
3. **Private VPC** — Lambda functions, Aurora RDS, and SQS run inside a private subnet; no direct internet access to data services
4. **Encryption** — TLS in transit (API Gateway, CloudFront), AES-256 at rest (S3, RDS, Secrets Manager)
5. **Pre-Signed S3 URLs** — Document access uses 15-minute expiring URLs, logged in the audit trail
6. **Secrets Manager** — Database credentials and API keys stored in AWS Secrets Manager, never in code or environment variables
7. **BAA-Eligible AWS Services** — All AWS services used (Lambda, RDS, S3, Cognito, SQS, Textract, API Gateway) are HIPAA-eligible and covered under the AWS BAA

---

## Roles and Responsibilities

- Architected and developed the full-stack Angular + AWS serverless platform from initial design through production
- Built the Nx monorepo structure with shared component library and TypeScript data types shared across both portals
- Implemented the NgRx state management layer with entity adapters, effects, and facade pattern for 10+ domain modules
- Developed the `@rafischechter/hihfs_bl` business logic package covering billing calculations, payroll processing, EVV submission, and audit logging
- Designed the serverless backend using AWS Lambda, API Gateway, Aurora RDS Data API, and SQS
- Built the Twilio phone system integration for IVR clock-in/out and voice notifications
- Integrated AWS Textract for asynchronous document OCR processing via SQS queue
- Implemented the EVV integration with NY State eMedNY for Electronic Visit Verification submissions
- Designed HIPAA compliance architecture including audit logging, RBAC, VPC isolation, and encryption
- Set up AWS Amplify CI/CD pipeline with multi-environment deployments (development, staging, production)
