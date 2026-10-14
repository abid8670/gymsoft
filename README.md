# Zenith GymSoft — Multi-Tenant Gym & Salon Management

A **multi-tenant SaaS platform** for hybrid gym + salon businesses: memberships, appointments,
retail POS, staff commissions, invoicing and a public-facing gym website — all from one deployment.

**React 19 SPA + Express 5 API** with a pluggable database layer (SQLite / PostgreSQL / MySQL) that
also deploys to Vercel as serverless functions.

---

## Highlights

- **Multi-tenant by design** — one deployment serves the SaaS portal, the gym directory and
  individual gym websites.
- **Plug-and-play database** — switch between SQLite, MySQL and PostgreSQL by changing one
  environment variable. No code changes.
- **Serverless-ready** — the same Express API runs locally (`node server/index.js`) and on Vercel
  (`api/index.js`) via rewrite rules.
- **Offline-friendly demo mode** — the db adapter lazily loads SQLite so the app boots on a
  fresh serverless instance with zero setup.

---

## Modules

### Operations
| Module | Description |
|--------|-------------|
| **Dashboard** | Live KPIs — active members, revenue, check-ins, expiring plans |
| **Members** | Member records, membership plans, discounts, tier assignment |
| **Check-In Terminal** | Front-desk kiosk for fast member check-in |
| **Appointments** | Salon/service booking with scheduling |
| **Invoices** | Invoice generation with **PDF export** |
| **Expenses** | Operating expense tracking |
| **Retail POS** | Point-of-sale for retail products |
| **Client Cards** | Tiered discount / loyalty cards |
| **Pricing Calculator** | Plan and package pricing builder |

### Staff & Finance
| Module | Description |
|--------|-------------|
| **Staff Management** | Staff records, roles and access |
| **Staff Commissions** | Commission tracking per staff member |
| **Activity Logs** | Audit trail of actions across the platform |

### SaaS & Growth
| Module | Description |
|--------|-------------|
| **SaaS Portal** | Subscription management for tenant gyms |
| **Gyms Directory** | Public directory of gyms on the platform |
| **Gym Website** | Per-gym public marketing site |
| **Member App Mockup** | Mobile app preview for members |
| **WhatsApp Automation** | Automated messaging workflows |
| **Export Center** | Bulk data export |
| **Landing Page** | Marketing landing page |
| **Upgrade Modal** | In-app plan upgrade flow |
| **Theme Customizer** | Per-tenant branding and theming |

---

## Architecture

```
gymsoft/
├── api/
│   └── index.js              # Vercel serverless entry point
├── server/
│   ├── index.js              # Express 5 app (local + production)
│   ├── database/
│   │   └── dbAdapter.js      # lazy-loaded multi-DB adapter
│   └── routes/
│       └── api.js            # REST API routes
├── src/
│   ├── components/           # 30+ React view components
│   ├── context/              # GymDataContext, ThemeContext (global state)
│   ├── services/             # apiClient.js, db.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vercel.json               # /api/* -> api/index.js, SPA fallback
└── vite.config.js
```

**Routing**

`vercel.json` sends `/api/(.*)` to `api/index.js` and everything else to `index.html`, so the SPA
handles client-side routes while the API stays serverless.

---

## Database configuration

Three modes, selected in `.env`:

```bash
# OPTION 1 — PostgreSQL / Neon (recommended for Vercel & cloud)
DATABASE_URL=postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require

# OPTION 2 — MySQL (local / XAMPP / cPanel / Docker)
DATABASE_URL=mysql://root:password@127.0.0.1:3306/gymsoft

# OPTION 3 — SQLite (zero-setup default fallback)
DB_TYPE=sqlite
SQLITE_FILE=./gymsoft.db
PORT=5000
```

The adapter in `server/database/dbAdapter.js` detects which driver is configured and normalises
queries across all three.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| UI | React 19, Lucide React, canvas-confetti |
| Build | Vite 8 |
| API | Express 5, CORS |
| Database | SQLite (`better-sqlite3`-style adapter), MySQL (`mysql2`), PostgreSQL (`pg`) |
| Config | dotenv |
| Lint | Oxlint |
| Deployment | Vercel (serverless) |

---

## Getting started

```bash
# 1. install
npm install

# 2. configure
cp .env.example .env
# edit .env — pick one of the three database options

# 3. run the API
npm run server

# 4. run the frontend (separate terminal)
npm run dev
```

The Vite dev server proxies API calls to the Express server on `PORT`.

### Build & production

```bash
npm run build     # build the SPA
npm start         # run the Express server in production
```

### Deploy

Push to a Vercel project — `vercel.json` handles the API rewrite and SPA fallback automatically.
Set `DATABASE_URL` in the Vercel environment variables.

---

## Roadmap

- [ ] Tenant onboarding and self-service signup
- [ ] Biometric / QR check-in integration
- [ ] Payment gateway integration
- [ ] Member mobile app (currently a UI mockup)
- [ ] Role-based access control across tenants

---

## Screenshots

> Add screenshots of the dashboard, check-in terminal and SaaS portal here.

---

## License

Proprietary — not licensed for redistribution.
