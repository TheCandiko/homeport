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

### Directory Structure

- `app/` - Next.js App Router pages and layouts
- `app/layout.tsx` - Root layout with font configuration and metadata
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles with Tailwind and CSS custom properties

### Components (`app/components/`)

- `HomeportLogo.tsx` - Logo with SVG icon and branding text
- `Button.tsx` - Reusable button with `filled`/`outlined` variants and `default`/`logged` states
- `Header.tsx` - App header with logo and "Log Today" action button
- `Modal.tsx` - Modal dialog with backdrop and escape key support
- `Form.tsx` - Form container layout
- `FormTitle.tsx` - Form header with icon, title, and close button
- `FormField.tsx` - Form input supporting text, number, date, and checkbox types
- `WeeklyHighlight.tsx` - Weekly progress tracker displaying metrics (LeetCode, DSA, Workout, Project hours)

### Path Aliases

Use `@/*` to import from the project root (e.g., `import { Component } from '@/components/Component'`).

## Code Style

- Prettier with single quotes, semicolons, trailing commas (ES5), 80 char width
- Tailwind classes are auto-sorted by prettier-plugin-tailwindcss
- ESLint configured with Next.js core-web-vitals and TypeScript rules
