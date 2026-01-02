# Images Directory Structure

## Folder Organization

```
images/
├── hero/                    # Hero slider images for homepage
├── profile/                 # Artist portrait photos
├── instagram/               # Instagram grid photos (8 images)
├── categories/              # Category preview images
└── works/                   # Artwork images
    ├── installations/
    ├── sculptures/
    ├── paintings/
    ├── ceramics/
    └── text-informed/
```

## Naming Conventions

### Works (`works/[category]/`)
- **Folder name:** kebab-case English slug (e.g., `echoes-of-displacement`)
- **Files:**
  - `cover.jpg` — main cover image (required)
  - `1.jpg`, `2.jpg`, `3.jpg` — additional gallery images (numbered in display order)

### Other Images
- **Hero:** `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- **Profile:** `artist-portrait.jpg`, `artist-working.jpg`
- **Instagram:** `instagram-1.jpg` to `instagram-8.jpg`
- **Categories:** `[category-name]-preview.jpg`
  - `installations-preview.jpg`
  - `sculptures-preview.jpg`
  - `paintings-preview.jpg`
  - `ceramics-preview.jpg`
  - `text-informed-preview.jpg`

## Image Requirements

### Formats
- **JPG** — for photographs (best size/quality ratio)
- **PNG** — if transparency needed
- **WebP** — Next.js will auto-convert

### Recommended Sizes
- **Hero:** 1920×1080px or larger
- **Work cover:** 1200×1200px (square) or 1600×1200px
- **Work gallery:** 1600×1200px
- **Category preview:** 800×800px
- **Profile:** 800×1000px
- **Instagram:** 1080×1080px (square)

### Optimization
- Compress before upload (use TinyPNG, Squoosh)
- Target size: 200-500 KB per file
- Next.js Image component will auto-optimize

## Usage Example

In markdown file:
```markdown
---
title: "Work Title"
coverImage: "/images/works/installations/work-slug/cover.jpg"
images:
  - "/images/works/installations/work-slug/1.jpg"
  - "/images/works/installations/work-slug/2.jpg"
  - "/images/works/installations/work-slug/3.jpg"
---
```

## Upload Process

1. Create work folder: `works/[category]/[work-slug]/`
2. Add `cover.jpg` and numbered images
3. Reference in markdown with path: `/images/works/...`
