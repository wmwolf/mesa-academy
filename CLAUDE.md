# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MESA Academy is a documentation site built with Astro and Starlight, focused on teaching MESA (Modules for Experiments in Stellar Astrophysics) computational astrophysics. The site uses versioned documentation with interactive tutorial tasks.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server at localhost:4321 |
| `npm run build` | Build production site to ./dist/ |
| `npm run preview` | Preview production build locally |
| `npm run astro -- --help` | Get Astro CLI help |

## Architecture

- **Framework**: Astro with Starlight documentation theme
- **Styling**: TailwindCSS v4 with custom global styles
- **Versioning**: Uses `starlight-versions` plugin for documentation versioning
- **Content**: MDX files in `src/content/docs/` with versioned content in subdirectories (e.g., `1.0/`)

### Key Components

- **Task Component** (`src/components/Task.astro`): Interactive task boxes for tutorials with numbered tasks per guide
- **Content Collections**: Configured in `src/content.config.ts` with docs and versions collections
- **Version Structure**: Version-specific content in `src/content/docs/[version]/` with corresponding sidebar config in `src/content/versions/[version].json`

### Content Organization

- Guides contain educational content with numbered tasks
- Examples demonstrate specific implementations
- Reference materials provide technical documentation
- Tasks use a custom Astro component with guide-specific numbering (e.g., Task 1.1, Task 2.3)

### Sidebar Configuration

Sidebar structure is defined both in `astro.config.mjs` (main) and version-specific JSON files in `src/content/versions/` for versioned content.