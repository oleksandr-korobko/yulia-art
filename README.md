# Yuliia Holovatiuk-Ungureanu — Artist Website

## Project Overview

Personal portfolio website for Ukrainian-born, UK-based multidisciplinary artist Yuliia Holovatiuk-Ungureanu.

**Design Inspiration:** [Chiharu Shiota](https://www.chiharu-shiota.com/) — minimalist, image-focused, clean navigation

**Language:** English only (UK audience)

---

## Development Phases

### Phase 1 (CURRENT) — Static Portfolio
- Multi-page presentation site
- Content stored in Markdown files
- Category-based work organization
- Events/News section (placeholder for future)
- Contact page

### Phase 2 (Future) — CMS / Admin Panel
### Phase 3 (Future) — Shop
### Phase 4 (Future) — Client Portal, CRM integration

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | **Next.js 14+ (App Router)** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS** |
| Content | **Markdown + Frontmatter** |
| Hosting | **Vercel** |
| Images | **Next.js Image optimization** |

---

## Site Structure

### Navigation
```
HOME | WORKS | ABOUT | CONTACT
      ↓
      ├── Installations
      ├── Sculptures
      ├── Paintings
      ├── Ceramic Works
      └── Text-Informed & Archival Works
```

*Future additions: NEWS, PUBLICATIONS*

### File Structure
```
yulia-art/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── works/
│   │   ├── page.tsx                # All works overview
│   │   ├── installations/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── sculptures/
│   │   ├── paintings/
│   │   ├── ceramics/
│   │   └── text-informed/
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   └── ...
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── SelectedWorks.tsx
│   └── works/
│       ├── WorkCard.tsx
│       ├── WorkGrid.tsx
│       └── WorkDetail.tsx
├── content/
│   ├── works/
│   │   ├── installations/
│   │   ├── sculptures/
│   │   ├── paintings/
│   │   ├── ceramics/
│   │   └── text-informed/
│   └── pages/
│       └── about.md
├── lib/
│   ├── content.ts
│   └── types.ts
├── public/
│   ├── images/
│   │   └── works/
│   └── cv.pdf
└── styles/
    └── globals.css
```

---

## Page Specifications

### HOME (`/`)

**Hero Section:**
- Full-width image slider (auto-rotate or manual)
- Artist name: **YULIIA HOLOVATIUK-UNGUREANU**
- Tagline: "A multidisciplinary artist working across immersive installation, sculpture, ceramics, and material-based painting..."
- Minimal navigation overlay (like Shiota)

**Selected Works Section:**
- 5 category cards with representative images
- Category titles + short descriptions
- Link to full category page

**Design Reference:** 
- Hero: Shiota homepage slider
- Works: tailwindcss.com/plus/ui-blocks/marketing/sections/blog-sections

---

### WORKS — Category Page (`/works/[category]`)

**Layout:**
- Category title at top
- Brief category description
- Grid of work thumbnails
- Click thumbnail → work detail page

**Design:** Clean grid, Shiota-style minimal cards

---

### WORKS — Single Work (`/works/[category]/[slug]`)

**Layout:**
- Large hero image
- Title, year, materials, dimensions
- Expandable description (accordion like Shiota)
- Image gallery
- Back to category link

**Design Reference:** chiharu-shiota.com/accumulation-searching-for-the-destination-95

---

### ABOUT (`/about`)

**Part 1 — Profile:**
- Photo left, text right (or mirrored)
- Full bio text
- Artist Statement section
- Download CV button (PDF)

**Part 2 — Instagram Grid:**
- 8 photos in 4x2 grid
- Each links to corresponding Instagram post

**Instagram Links:**
- instagram.com/p/DHTyUkXKJk6
- instagram.com/p/DJ_0vD8Kym4
- instagram.com/p/C9WzUXTMVST
- instagram.com/p/DHim6h7tD7G
- instagram.com/p/DHygV96q_HB
- instagram.com/p/DQrU4I9DGi3
- instagram.com/p/DH_rbFqq3yo

---

### CONTACT (`/contact`)

**Layout:**
- Photo on left side
- Contact info on right:
  - Email: ungureanuyuliia@gmail.com
  - Instagram: @yuliia_art_uk_ua
  - Download CV link

**Design Reference:** 
- Shiota contact: chiharu-shiota.com/contact
- Or: tailwindcss.com/plus/ui-blocks/marketing/sections/contact-sections

---

### FOOTER

**Content:**
- Instagram icon + link
- Copyright: "© 2025 Yuliia Holovatiuk-Ungureanu. All rights reserved."
- Legal text (cookies, external links disclaimer)

---

## Content Format

### Work Markdown (`content/works/[category]/work-name.md`)

```markdown
---
title: "Work Title"
year: 2024
category: "installations"
materials: "Mixed media, found objects"
dimensions: "Variable"
featured: true
coverImage: "/images/works/installations/work-name/cover.jpg"
images:
  - "/images/works/installations/work-name/1.jpg"
  - "/images/works/installations/work-name/2.jpg"
order: 1
---

Description of the work. Can include multiple paragraphs.

This work explores themes of displacement and memory...
```

---

## Work Categories

| Slug | Display Name | Description |
|------|--------------|-------------|
| `installations` | Installations | Spatial works engaging material, scale, and context to create reflective environments shaped by individual & collective experience |
| `sculptures` | Sculptures | Sculptural works often using found objects to explore endurance, rupture, and material memory |
| `paintings` | Paintings | Material-based paintings using natural pigments and earth imprints, where surface operates as substance |
| `text-informed` | Text-Informed & Archival Works | Works engaging text, archival materials, photographs, and moving images to examine memory, history, and lived experience |
| `ceramics` | Ceramic Works | Ceramic objects ranging from singular forms to modular structures, addressing reconstruction, fragility, and continuity |

---

## Content: Artist Bio

**Short (for homepage):**
> A multidisciplinary artist working across immersive installation, sculpture, ceramics, and material-based painting, engaging with archival materials, legal documents, and artefacts to examine how war, displacement, and the pursuit of justice shape pathways of healing, resilience, and rebuilding future realities.

**Full Profile:** See `content/pages/about.md` (to be created from provided text)

---

## Design Principles

1. **Minimalism** — Maximum whitespace, minimal UI elements
2. **Image-first** — Works are the hero, text supports
3. **Clean typography** — Light fonts, generous spacing
4. **Neutral palette** — White/black base, color from artwork
5. **Smooth interactions** — Subtle transitions, no jarring effects
6. **Mobile-first** — Responsive, touch-friendly

---

## Assets Needed

- [ ] High-resolution work images (organized by category)
- [ ] Profile photo for About page
- [ ] CV as PDF
- [ ] Instagram grid photos (8 images)
- [ ] Hero slider images (3-5)

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Lint code
```

---

## TODO — Phase 1

### Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up project structure
- [ ] Create base layout (Header, Footer)

### Core Pages
- [ ] Home page with hero + selected works
- [ ] Works category pages
- [ ] Individual work detail pages
- [ ] About page
- [ ] Contact page

### Content System
- [ ] Markdown reading utilities
- [ ] TypeScript types for Work, Category
- [ ] Sample content for testing

### Polish
- [ ] Image optimization
- [ ] SEO meta tags
- [ ] Favicon
- [ ] 404 page
- [ ] Deploy to Vercel

---

## Tailwind Plus Components (Available)

Components are in `/tailwind-components/` folder. Use as reference/base:

| Component File | Use For |
|----------------|---------|
| `Split_with_image_-_marketing.jsx` | **HOME Hero** — image right, text left |
| `With_angled_image_on_right.jsx` | **HOME Hero alternative** — with navigation |
| `Three-column_with_background_images.jsx` | **WORKS grid** — category cards |
| `Split_with_image.jsx` | **ABOUT page** — photo + bio text |
| `With_testimonial_and_stats.jsx` | **ABOUT alternative** — with stats |
| `Split_with_image_-_page_sections.jsx` | **CONTACT page** — photo + form/info |
| `Simple_with_social_links.jsx` | **FOOTER** — social icons + copyright |
| `Two_row_bento_grid.jsx` | **Instagram grid** — for About page |
| `With_photo_and_list.jsx` | **Press/News** — future use |

## Questions to Resolve

1. **Hero slider** — Auto-rotate or manual arrows? Speed?
2. **Work detail accordion** — Always collapsed or first section open?
3. **News/Publications** — Placeholder pages now or omit from navigation?

---

## Contact

- Developer: [Your name]
- Artist: Yuliia Holovatiuk-Ungureanu
- Instagram: @yuliia_art_uk_ua
- Email: ungureanuyuliia@gmail.com
