# Project Plan

## Phase 1: Static Portfolio Site

### Core Pages
- [x] Home page with hero
- [x] Works page with gallery grid
- [x] About page
- [x] Contact page
- [x] Individual work detail pages

### Real Content
- [x] 19 real artwork markdown files
- [x] ~152 artwork images processed and uploaded
- [ ] Fill 5 placeholder descriptions (artist task)

### SEO & Metadata
- [ ] **Meta tags** (title, description) for all pages
- [ ] **OpenGraph tags** for social media sharing
- [ ] **JSON-LD structured data** for artworks
- [ ] **sitemap.xml** generation
- [ ] **robots.txt** configuration
- [ ] **Canonical URLs** setup
→ **See SEO-PLAN.md for detailed implementation**

### Performance Optimization
- [x] Basic responsive layout
- [x] Instagram feed integration (static)
- [x] Next.js Image optimization
- [x] Image lazy loading (automatic via Next.js Image)
- [ ] **Image compression** - reduce file sizes (~152 images)
- [ ] **Lighthouse audit** - aim for 90+ scores
- [ ] **Bundle size optimization** - analyze and reduce if needed
- [ ] **Font optimization** - ensure Google Fonts are loading efficiently

### Analytics & Tracking
- [ ] Choose analytics provider (Google Analytics vs Plausible)
- [ ] Install tracking code
- [ ] Setup events for work views
- [ ] Privacy policy page (if using GA)

### Content Categories - Works System Implementation
- [x] **Етап 0:** GitHub репо yulia-art-content + Vercel webhook ✅
- [x] **Етап 1:** TypeScript типи (lib/types.ts) ✅
- [x] **Етап 2:** Категорії (lib/categories.ts) ✅
- [x] **Етап 3:** Fetch content скрипт + package.json + .gitignore ✅
- [x] **Етап 4:** Content utilities (lib/content.ts) ✅
- [x] **Етап 5:** Works index page (app/works/page.tsx) ✅
- [x] **Етап 6:** Dynamic [slug] page (app/works/[slug]/page.tsx) ✅
- [x] **Етап 7:** Loading + 404 states ✅
- [x] **Етап 8:** Featured Works на home ✅
- [x] **Етап 9:** Тестовий контент в yulia-art-content репо ✅
- [x] **Етап 10:** Typography + serif font ✅

**✅ ALL 10 STEPS COMPLETE!** See PROGRESS.md for details.

**Детальний план:** `/Users/OleksandrKorobko/.claude/plans/hazy-zooming-snowflake.md`

---

## Pre-Launch Checklist (Critical)

**Must-have before going live:**
- [ ] **SEO metadata** - all pages have proper meta tags
- [ ] **OpenGraph tags** - social media sharing works correctly
- [ ] **sitemap.xml** - search engines can crawl the site
- [ ] **robots.txt** - search engine directives
- [ ] **Image compression** - reduce file sizes for faster loading
- [ ] **Lighthouse audit** - all scores 90+
- [ ] **Mobile testing** - works perfectly on mobile devices
- [ ] **Cross-browser testing** - Chrome, Safari, Firefox
- [ ] **Contact form testing** - email link works
- [ ] **All links working** - internal and external links verified

**Nice-to-have:**
- [ ] Analytics setup
- [ ] Privacy policy (if using GA)
- [ ] Enhanced 404 page
- [ ] Page transitions

---

## Phase 2: CMS Integration (Future)
- [ ] Choose CMS (Sanity/Contentful)
- [ ] Migration strategy
- [ ] Dynamic content loading

## Technical Debt
- [ ] Image optimization (file sizes)
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Lighthouse score improvements

## Design Polish
- [ ] **Page transitions** - smooth navigation between pages
- [ ] **Hover animations** - enhance interactive elements
- [ ] **Image gallery enhancements** - lightbox or better image viewing
- [x] Loading states for /works page
- [ ] Loading states for individual work pages
- [ ] Loading states for category pages
- [ ] **Error states** - image loading failures, network errors
- [x] 404 page (basic version)
- [ ] Enhance 404 page with artwork recommendations
