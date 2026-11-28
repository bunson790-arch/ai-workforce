# AI Workforce

An autonomous AI company platform where specialized AI employees work across departments to build, manage, operate and grow businesses.

## Frontend — department by department

The first frontend milestone is the **CEO & Executive Management** workspace dashboard. It provides the shared company shell and previews the department navigation in the agreed order:

1. CEO & Executive Management
2. Marketing Department
3. Communications Department
4. Sales Department
5. Research Department
6. Technology Department
7. Human Resources & Administration
8. Finance & Payments Department (final development phase)

### Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

To verify a production build:

```bash
npm run build
```

The current dashboard is a frontend-only starting point with local sample content and interactive UI states. It is not connected to backend services or external integrations yet; approval and task actions update only the current browser session. Backend connections will be added in later implementation phases.
