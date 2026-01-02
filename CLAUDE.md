# CLAUDE.md

> Instructions for Claude Code. Read automatically.

## Project Context

Portfolio website for **Yuliia Holovatiuk-Ungureanu**, a UK-based Ukrainian multidisciplinary artist.

**Current Phase:** Phase 1 — Static portfolio site

**Design Reference:** [Chiharu Shiota](https://www.chiharu-shiota.com/) — minimal, image-focused, elegant

## Technical Decisions

### Stack
- **Next.js 14+** with App Router (NOT Pages Router)
- **TypeScript** — strict mode, no `any`
- **Tailwind CSS** — no separate component CSS files
- **Markdown** — content in `.md` files with frontmatter

### Structure
- See `README.md` for full folder structure
- Components in `components/`
- Content (works, pages) in `content/`
- Utilities in `lib/`

### Code Style
- Functional components with typed props
- Named exports for components, default for pages
- PascalCase for components, camelCase for functions
- No `console.log` in production code

## Work Categories

```typescript
type Category = 
  | 'installations'
  | 'sculptures'
  | 'paintings'
  | 'ceramics'
  | 'text-informed';
```

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # Lint check
```

## Key Requirements

1. **Language:** English only
2. **Design:** Minimalist, Shiota-inspired
3. **Mobile-first:** Always consider mobile first
4. **Scalable:** Structure must allow for future CMS integration
5. **Image-heavy:** Optimize all images, use Next.js Image component

## Tailwind Plus Components

Reference components are in `/tailwind-components/`. Key mappings:
- Hero: `Split_with_image_-_marketing.jsx` or `With_angled_image_on_right.jsx`
- Works grid: `Three-column_with_background_images.jsx`
- About: `Split_with_image.jsx`
- Contact: `Split_with_image_-_page_sections.jsx`
- Footer: `Simple_with_social_links.jsx`

Adapt these to project needs. Convert JSX → TSX. Remove demo content.

## DO NOT

- Use Pages Router (App Router only)
- Create over-engineered abstractions
- Add unnecessary dependencies
- Hardcode content in components (use content/ folder)
- Copy Tailwind components verbatim — adapt and simplify

## Current Status

Phase 1, Setup stage — need to initialize Next.js project

## Artist Info

- **Name:** Yuliia Holovatiuk-Ungureanu
- **Location:** United Kingdom
- **Email:** ungureanuyuliia@gmail.com
- **Instagram:** @yuliia_art_uk_ua
- **Focus:** Installation, sculpture, ceramics, painting
- **Themes:** War, displacement, memory, healing, resilience
