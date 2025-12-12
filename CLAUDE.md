# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Homeport is a self-hosted dashboard application for tracking goals, controlling your home, and starting your day. Built with Next.js 16, React 19, and Tailwind CSS 4.

## Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check formatting without modifying files
```

## Architecture

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 via PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font
- **Backend**: Supabase (auth and database via `@supabase/ssr`)

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `app/layout.tsx` - Root layout with font configuration and metadata
- `app/page.tsx` - Home page (dashboard with daily logging)
- `app/login/page.tsx` - Login page with Supabase auth
- `app/globals.css` - Global styles with Tailwind and CSS custom properties
- `lib/supabase/` - Supabase client utilities and types

### Components (`app/components/`)

- `HomeportLogo.tsx` - Logo with SVG icon and branding text
- `Button.tsx` - Reusable button with `filled`/`outlined` variants and `default`/`logged` states
- `Header.tsx` - App header with logo and logout button
- `Modal.tsx` - Modal dialog with backdrop and escape key support
- `Form.tsx` - Form container layout
- `FormTitle.tsx` - Form header with icon, title, and close button
- `FormField.tsx` - Form input supporting text, number, date, checkbox, email, and password types
- `WeeklyHighlight.tsx` - Weekly progress tracker displaying metrics (LeetCode, DSA, Workout, Project hours)
- `DailyLogForm.tsx` - Modal form for creating/editing daily log entries
- `LogTodayButton.tsx` - Button showing logged/not-logged state with conditional icon
- `LoggedDayTable.tsx` - Table displaying logged days with edit/delete actions

### Path Aliases

Use `@/*` to import from the project root (e.g., `import { Component } from '@/components/Component'`).

## Code Style

- Prettier with single quotes, semicolons, trailing commas (ES5), 80 char width
- Tailwind classes are auto-sorted by prettier-plugin-tailwindcss
- ESLint configured with Next.js core-web-vitals and TypeScript rules

## Data Types

- `LoggedDay` (`lib/supabase/types.ts`) - Database row type for logged_days table
- `LogEntry` (`app/components/LoggedDayTable.tsx`) - Frontend representation of a logged day
- `FormData` (`app/components/DailyLogForm.tsx`) - Form state for daily log modal
