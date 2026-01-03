# SEO Metadata Implementation Plan

**Created:** 2026-01-03
**Status:** Planned (Not Started)
**Estimated Time:** 2-3 hours
**Priority:** High (Critical for production)

---

## Overview

Currently the site has basic `title` and `description` metadata, but lacks:
- OpenGraph tags (Facebook/Instagram/LinkedIn previews)
- Twitter Card tags
- Structured data (Schema.org)
- Proper image metadata for social sharing

This plan adds comprehensive SEO metadata to all pages.

---

## Current State Analysis

### ✅ What Exists Now

**app/layout.tsx** (lines 17-20):
```typescript
export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
}
```
- Basic title/description from site config
- NO OpenGraph/Twitter cards
- NO social sharing images

**app/works/[slug]/page.tsx** (lines 24-46):
```typescript
export async function generateMetadata({ params }: Props) {
  // For categories
  if (slug in CATEGORIES) {
    return {
      title: `${category.name} — Yuliia Holovatiuk-Ungureanu`,
      description: category.description,
    };
  }

  // For individual works
  const work = await getWork(slug);
  return {
    title: `${work.title} — Yuliia Holovatiuk-Ungureanu`,
    description: work.shortDescription,
  };
}
```
- Title and description exist
- NO images for social sharing
- NO OpenGraph/Twitter tags

### ❌ What's Missing

1. **OpenGraph tags** - No preview images when sharing on Facebook/Instagram
2. **Twitter Cards** - No large image cards on Twitter/X
3. **Structured Data** - Google doesn't know these are artworks
4. **About/Contact metadata** - These pages have no custom metadata
5. **Favicon/App icons** - Browser tabs show default Next.js icon

---

## Implementation Plan

### Phase 1: Root Metadata (app/layout.tsx)

**File:** `app/layout.tsx`
**Lines to modify:** 17-20
**Time:** 15 minutes

#### Current Code:
```typescript
export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
}
```

#### New Code:
```typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteTitle,
    template: '%s — Yuliia Holovatiuk-Ungureanu',
  },
  description: siteConfig.siteDescription,

  // OpenGraph (Facebook, LinkedIn, Instagram)
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: siteUrl,
    siteName: 'Yuliia Holovatiuk-Ungureanu',
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Create this 1200×630 image
        width: 1200,
        height: 630,
        alt: 'Yuliia Holovatiuk-Ungureanu - Artist Portfolio',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@yuliia_art_uk_ua', // Artist's Twitter handle
  },

  // Viewport & theme
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // Icons (add these files to /public)
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Additional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### Required Assets:
- [ ] Create `/public/og-image.jpg` (1200×630px) - hero image or featured work
- [ ] Create `/public/favicon.ico`
- [ ] Create `/public/apple-touch-icon.png` (180×180px)
- [ ] Add `NEXT_PUBLIC_SITE_URL` to `.env.local` and Vercel

---

### Phase 2: Work Pages Metadata (app/works/[slug]/page.tsx)

**File:** `app/works/[slug]/page.tsx`
**Lines to modify:** 24-46
**Time:** 20 minutes

#### For Individual Works

Replace lines 37-42 with:

```typescript
// Individual work
try {
  const work = await getWork(slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    title: work.title, // Template from layout.tsx will add " — Yuliia..."
    description: work.shortDescription,

    // OpenGraph
    openGraph: {
      type: 'article',
      url: `${siteUrl}/works/${slug}`,
      title: work.title,
      description: work.shortDescription,
      publishedTime: `${work.year}-01-01T00:00:00.000Z`,
      authors: ['Yuliia Holovatiuk-Ungureanu'],
      images: [
        {
          url: `${siteUrl}${work.coverImage}`,
          width: 1200,
          height: 630,
          alt: `${work.title} - ${work.materials}`,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description: work.shortDescription,
      images: [`${siteUrl}${work.coverImage}`],
      creator: '@yuliia_art_uk_ua',
    },
  };
} catch {
  return {
    title: 'Work Not Found',
  };
}
```

#### For Category Pages

Replace lines 28-33 with:

```typescript
// Category page
if (slug in CATEGORIES) {
  const category = CATEGORIES[slug as CategorySlug];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const works = getWorksByCategorySlug(slug as CategorySlug);

  // Use first work's cover image as category preview
  const previewImage = works.length > 0
    ? works[0].coverImage
    : '/og-image.jpg';

  return {
    title: category.name,
    description: category.description,

    openGraph: {
      type: 'website',
      url: `${siteUrl}/works/${slug}`,
      title: category.name,
      description: category.description,
      images: [
        {
          url: `${siteUrl}${previewImage}`,
          width: 1200,
          height: 630,
          alt: `${category.name} - Yuliia Holovatiuk-Ungureanu`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: category.description,
      images: [`${siteUrl}${previewImage}`],
    },
  };
}
```

---

### Phase 3: About Page Metadata

**File:** `app/about/page.tsx`
**Action:** Add metadata export
**Time:** 10 minutes

Add to the top of the file (after imports):

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Yuliia Holovatiuk-Ungureanu is a UK-based Ukrainian multidisciplinary artist working with installation, sculpture, ceramics, and text-informed practices.',

  openGraph: {
    type: 'profile',
    title: 'About Yuliia Holovatiuk-Ungureanu',
    description: 'UK-based Ukrainian multidisciplinary artist exploring themes of war, displacement, memory, and resilience.',
    images: [
      {
        url: '/images/artist-photo.jpg', // Add artist photo
        width: 1200,
        height: 630,
        alt: 'Yuliia Holovatiuk-Ungureanu',
      },
    ],
  },
};
```

**Required:**
- [ ] Add `/public/images/artist-photo.jpg` (professional artist photo)

---

### Phase 4: Contact Page Metadata

**File:** `app/contact/page.tsx`
**Action:** Add metadata export
**Time:** 5 minutes

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Yuliia Holovatiuk-Ungureanu. Email: ungureanuyuliia@gmail.com',

  openGraph: {
    type: 'website',
    title: 'Contact Yuliia Holovatiuk-Ungureanu',
    description: 'Get in touch with Yuliia for exhibitions, commissions, or inquiries.',
  },
};
```

---

### Phase 5: Works Index Page Metadata

**File:** `app/works/page.tsx`
**Action:** Add metadata export
**Time:** 5 minutes

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Works',
  description: 'Explore artworks by Yuliia Holovatiuk-Ungureanu across installations, sculptures, ceramics, paintings, and text-informed practices.',

  openGraph: {
    type: 'website',
    title: 'Works - Yuliia Holovatiuk-Ungureanu',
    description: 'Explore artworks across installations, sculptures, ceramics, and text-informed practices.',
  },
};
```

---

### Phase 6: Structured Data (JSON-LD)

**File:** Create `components/StructuredData.tsx`
**Time:** 30 minutes

Create reusable component for Schema.org structured data:

```typescript
export function ArtworkStructuredData({ work }: { work: Work }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: work.title,
    description: work.shortDescription,
    image: `${siteUrl}${work.coverImage}`,
    dateCreated: work.year.toString(),
    artMedium: work.materials,
    creator: {
      '@type': 'Person',
      name: 'Yuliia Holovatiuk-Ungureanu',
      url: siteUrl,
      sameAs: [
        'https://www.instagram.com/yuliia_art_uk_ua/',
      ],
    },
    workPresented: {
      '@type': 'CreativeWork',
      name: work.title,
      artform: work.categories.join(', '),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

**Usage:** Add to `app/works/[slug]/page.tsx` in WorkPage component:

```typescript
import { ArtworkStructuredData } from '@/components/StructuredData';

async function WorkPage({ slug }: { slug: string }) {
  const work = await getWork(slug);

  return (
    <>
      <ArtworkStructuredData work={work} />
      <main>
        {/* existing content */}
      </main>
    </>
  );
}
```

---

### Phase 7: Environment Variables

**File:** `.env.local` (create if doesn't exist)
**Time:** 5 minutes

```env
# Site URL for production
NEXT_PUBLIC_SITE_URL=https://yulia-art.vercel.app
```

**Also add to Vercel:**
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add `NEXT_PUBLIC_SITE_URL` = `https://yulia-art.vercel.app`

---

### Phase 8: Image Assets Checklist

Create these images and add to `/public/`:

- [ ] **og-image.jpg** (1200×630px)
  - Default sharing image
  - Use hero image or featured artwork
  - High quality, clear branding

- [ ] **favicon.ico** (32×32px or 64×64px)
  - Browser tab icon
  - Simple logo or initials

- [ ] **apple-touch-icon.png** (180×180px)
  - iOS home screen icon
  - Same as favicon but larger

- [ ] **artist-photo.jpg** (1200×630px recommended)
  - Professional artist photo for About page
  - Good lighting, neutral background

---

## Testing Checklist

After implementation, test:

### Manual Testing

- [ ] **Facebook Sharing Debugger**
  - URL: https://developers.facebook.com/tools/debug/
  - Test: Homepage, work pages, about, contact
  - Verify: Images load, title/description correct

- [ ] **Twitter Card Validator**
  - URL: https://cards-dev.twitter.com/validator
  - Test: All page types
  - Verify: Large image card displays

- [ ] **LinkedIn Post Inspector**
  - URL: https://www.linkedin.com/post-inspector/
  - Test: Homepage and key works

- [ ] **Google Rich Results Test**
  - URL: https://search.google.com/test/rich-results
  - Test: Individual work pages with structured data
  - Verify: VisualArtwork schema recognized

### Browser Testing

- [ ] Check browser tabs show correct titles
- [ ] Check favicons display correctly
- [ ] Check OpenGraph preview in browser extensions (if available)

### Search Console

After deployment:
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for key pages
- [ ] Monitor structured data errors

---

## Implementation Order

**Recommended sequence:**

1. **Day 1 - Core Metadata** (1 hour)
   - Phase 1: Root layout metadata
   - Phase 7: Environment variables
   - Test locally

2. **Day 2 - Work Pages** (1 hour)
   - Phase 2: Work and category metadata
   - Create/add basic images (favicon, og-image)
   - Test sharing locally with ngrok

3. **Day 3 - Other Pages + Structured Data** (1 hour)
   - Phase 3: About page
   - Phase 4: Contact page
   - Phase 5: Works index
   - Phase 6: Structured data
   - Deploy and test in production

4. **Day 4 - Polish + Testing** (30 minutes)
   - Phase 8: Final image assets
   - Run all tests
   - Fix any issues

---

## Success Metrics

After full implementation:

✅ **Google Search:**
- Site appears in search results with images
- Artwork pages show structured snippets
- "Artist portfolio" searches rank well

✅ **Social Sharing:**
- Facebook/Instagram posts show large preview images
- Twitter cards display correctly
- LinkedIn shares look professional

✅ **Technical:**
- Lighthouse SEO score: 90+
- All pages have unique titles
- No missing metadata warnings

✅ **User Experience:**
- Professional appearance when shared
- Clear branding across platforms
- Easy to identify in browser tabs

---

## Notes & Considerations

### Image Optimization
- All OG images should be optimized (compressed)
- Recommended: Use Next.js Image component then export static
- Max file size: 300KB per image

### URL Structure
- Current: `/works/the-escape` ✅ Clean and SEO-friendly
- Avoid: Query parameters or complex nested routes

### Language
- Currently English only
- Future: Consider i18n if targeting Ukrainian/Russian audiences
- Add `hreflang` tags if adding languages

### Performance Impact
- Structured data adds ~2-3KB per page
- OpenGraph metadata: minimal impact
- Overall: Negligible performance cost

### Maintenance
- Update OG images when changing featured works
- Review metadata quarterly
- Monitor Google Search Console for errors

---

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [OpenGraph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org VisualArtwork](https://schema.org/VisualArtwork)
- [Google Rich Results](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

---

## End of Plan

**Total Estimated Time:** 2-3 hours
**Complexity:** Medium
**Dependencies:** None (can start immediately)
**Blocking:** None
**Priority:** High for production launch
