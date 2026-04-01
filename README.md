# Overview

A full-stack issue tracking application built with Next.js, React 19, TypeScript, Prisma, and MySQL. it extended and updated Mosh Hamedani’s original tutorial.

## Key Difference with Mosh's 2023 Course

- Params and searchParams in Props are Promise type now
- PlantScale no longer offers free Hobby tier, use Aiven as production database
- get rid of
- Add registration page and credentials provider, users can register and log in to enable edit function
- Add status selector on issue detail page to update status
- In custom Link component, legacyBehavior will be deprecated. To ensure future consistency, use RadixLink to wrap NextLink
- In AssigneeSelector component, Select component no longer accepts an empty string as value, use 'unassigned' to represent unassigned status

## Tech Stack

- Frontend: Next.js 15 (App Router), React 19, Radix UI, Tailwind CSS
- Backend: Prisma ORM (MySQL), REST API routes
- State Management: TanStack Query
- Auth: NextAuth v4 with Google OAuth
- Deployment: Vercel, Aiven MySQL
- Dev Tools: TypeScript, ESLint, Prettier, Sentry

## Features

- Create, view, edit, and delete issues
- Assign users to issues with live assignee selector

- Browse all issues with filtering, sorting, and pagination
- View issue details and edit existing records
- Dashboard with issue summary and bar chart visualizations

- Google sign-in with NextAuth
- Dynamic rendering with server and client components
- Role-based route protection and session handling

Data Fetching & Caching
**Frontend**

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI Themes
- React Hook Form
- Zod
- React SimpleMDE / Markdown rendering
- Recharts

**Backend / Data**

- Prisma ORM
- MySQL
- NextAuth
- Axios
- React Query

**Tooling**

- ESLint
- PostCSS
- TSX
- Sentry for Next.js

## Project Structure

```text
app/
├── api/                  # API routes for auth, issues, and users
├── auth/                 # NextAuth configuration and provider wrapper
├── components/           # Reusable UI components
├── issues/               # Issue list, detail, create, and edit routes
├── lib/                  # Shared helpers such as Prisma client
├── IssueChart.tsx        # Dashboard chart
├── IssueSummary.tsx      # Summary cards
├── LatestIssues.tsx      # Recent issue widget
└── page.tsx              # Dashboard/home page

prisma/
└── schema.prisma         # Issue, user, session, and auth models
```

## Data Model

The Prisma schema includes:

- **Issue**: title, description, status, timestamps, assigned user
- **User**: user profile and assigned issues
- **Account / Session / VerificationToken / Authenticator**: authentication support

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd issue-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=""
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
PORT=3001
```

### 4. Run database migrations / generate Prisma client

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Why this project is useful

This repo demonstrates:

- building a real CRUD workflow with the App Router
- structuring a full-stack Next.js application
- integrating authentication and database persistence
- combining dashboard UX with operational issue-management features
- adding observability tooling to a practical web application

## Possible Improvements

- Add role-based access control for admins and standard users
- Improve issue assignment workflows with notifications
- Add test coverage for API routes and critical UI flows
- Support richer analytics and reporting on issue trends

## License

This project is for learning and portfolio use.
