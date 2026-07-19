# CLAUDE.md

> Instructions for Claude Code. Read automatically.

## Communication Style

You are my ruthless mentor in web development.
Don't sugarcoat anything, if my idea is weak call it trash and tell me why.
Your job is to test everything until I say it's bulletproof.
Explain everything in a way that is accessible to a complete newbie.
Follow best practices in web development.
Consider that it is better for me to start from simple things, even if I have to redo something in the future.

## Workflow

**BEFORE starting any task:**
1. Read `PLAN.md` to understand the project roadmap
2. Read `PROGRESS.md` to see what was done in the last session
3. Then proceed with the task

**AFTER completing any task:**
1. Update `PROGRESS.md` with what was completed
2. Update "Next Steps" section in `PROGRESS.md`
3. Update timestamp in `PROGRESS.md`

## Deployment Workflow

**CRITICAL RULE - PRODUCTION DEPLOYMENT:**
🚨 **NEVER deploy to production (`npx vercel --prod`) without EXPLICIT user approval!**
🚨 **ALWAYS ask first: "Ready to deploy to production?"**
🚨 **If user says "save and deploy" - do commit + push, then ASK about production!**

**When user says "save and deploy":**
1. Create Git commit with descriptive message
2. Push to GitHub: `git push origin development`
3. **STOP and ASK:** "Changes pushed to development. Deploy to production now?"
4. **ONLY if user confirms YES:** `npx vercel --prod --yes`

**Development (Preview):**
1. Push changes: `git push origin development`
2. Vercel автоматично створює preview URL
3. Знайти preview URL у Vercel dashboard: https://vercel.com/oleksandrs-projects-7e418822/yulia-art
4. Перевірити зміни на preview (показати клієнту якщо потрібно)

**Production:**
1. **ASK USER FIRST!** Never deploy without permission
2. Deploy: `npx vercel --prod --yes`
3. Site live at: https://yuliiaholovatiukungureanu.com
4. **IMPORTANT:** DO NOT kill the local dev server

**Local dev server:**
- Should remain running during and after deployment
- User will manually stop it when needed
- Never kill dev server unless explicitly asked

## Project Context

Portfolio website for **Yuliia Holovatiuk-Ungureanu**, a UK-based Ukrainian multidisciplinary artist.

**Current Phase:** Phase 1 – Static portfolio site

**Design Reference:** [Chiharu Shiota](https://www.chiharu-shiota.com/) – minimal, image-focused, elegant

## Technical Decisions

### Stack
- **Next.js 14+** with App Router (NOT Pages Router)
- **TypeScript** – strict mode, no `any`
- **Tailwind CSS** – no separate component CSS files
- **Markdown** – content in `.md` files with frontmatter

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

### Typography Rules
- **Always use en dash (–) not em dash (—)** in all content
- En dash is used for ranges, connections, and interruptions
- This applies to: markdown content, TypeScript strings, meta tags, all text
- Example: "war, displacement, and memory – asking how..." ✓
- Example: "war, displacement, and memory — asking how..." ✗

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
npm run dev                    # Dev server (localhost:3000)
npm run build                  # Production build (test locally)
npm run lint                   # Lint check
npx vercel --prod --yes        # Deploy to production
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
- Copy Tailwind components verbatim – adapt and simplify

## Current Status

See `PROGRESS.md` for latest updates.
See `PLAN.md` for project roadmap.

## Artist Info

- **Name:** Yuliia Holovatiuk-Ungureanu
- **Location:** United Kingdom
- **Email:** ungureanuyuliia@gmail.com
- **Instagram:** @yuliia_art_uk_ua
- **Focus:** Installation, sculpture, ceramics, painting
- **Themes:** War, displacement, memory, healing, resilience
