# 02 – Architecture & Structure

> Project organization, folder structure, and file naming conventions

---

## Core Principle: Separation of Concerns

```
CODE        CONTENT        UTILITIES      ASSETS
  ↓            ↓              ↓             ↓
app/       content/        lib/         public/
components/
```

**Never mix these layers!**
- Components don't contain content
- Content doesn't contain logic
- Utilities are pure functions
- Assets are static files

---

## Complete Folder Structure

```
my-project/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Header, Footer)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles (Tailwind)
│   ├── not-found.tsx             # 404 page
│   │
│   ├── works/                    # Works section (example)
│   │   ├── page.tsx              # Works index
│   │   ├── loading.tsx           # Loading state
│   │   └── [slug]/               # Dynamic routes
│   │       ├── page.tsx          # Category or Work detail
│   │       └── loading.tsx       # Loading state
│   │
│   ├── about/
│   │   └── page.tsx              # About page
│   │
│   └── contact/
│       └── page.tsx              # Contact page
│
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Site header
│   │   └── Footer.tsx            # Site footer
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── types.ts              # TypeScript interfaces for UI props
│   │   ├── Layout.tsx            # Barrel export
│   │   ├── PageContainer.tsx     # Horizontal padding + max-width
│   │   ├── PageSection.tsx       # Vertical spacing
│   │   ├── ContentStack.tsx      # Element spacing
│   │   ├── Grid.tsx              # Responsive grids
│   │   ├── Card.tsx              # Image + text blocks
│   │   ├── HeaderContainer.tsx   # Header-specific container
│   │   └── FooterContainer.tsx   # Footer-specific container
│   │
│   ├── home/                     # Home page components
│   │   ├── Hero.tsx
│   │   ├── FeaturedWorks.tsx
│   │   └── ArtistStatement.tsx
│   │
│   ├── PageTransition.tsx        # Page transition wrapper
│   ├── Lightbox.tsx              # Image lightbox
│   ├── Gallery.tsx               # Image gallery
│   └── StructuredData.tsx        # JSON-LD SEO data
│
├── content/                      # All content (Git tracked)
│   ├── pages/                    # Page content
│   │   ├── main/
│   │   │   ├── home.md
│   │   │   ├── artist-statement.md
│   │   │   ├── selected-works.md
│   │   │   └── featured-works.md
│   │   ├── about.md
│   │   └── contact.md
│   │
│   ├── works/                    # Works markdown files
│   │   ├── work-1.md
│   │   ├── work-2.md
│   │   └── ...
│   │
│   ├── category-order.json       # Work ordering by category
│   ├── site-config.md            # Global site configuration
│   └── instagram-feed.md         # Instagram feed data
│
├── lib/                          # Utilities and helpers
│   ├── types.ts                  # TypeScript type definitions
│   ├── categories.ts             # Category configuration
│   ├── content.ts                # Content reading utilities
│   └── utils.ts                  # General utilities
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── works/                # Artwork images
│   │   │   ├── work-1/
│   │   │   │   ├── cover.jpg
│   │   │   │   ├── 01.jpg
│   │   │   │   └── 02.jpg
│   │   │   └── ...
│   │   ├── profile/
│   │   │   └── artist-portrait.jpg
│   │   └── instagram/
│   │       └── instagram-*.png
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.jpg
│   └── cv.pdf
│
├── scripts/                      # Build/utility scripts
│   └── (optional scripts)
│
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── CLAUDE.md                     # Claude Code instructions
├── PLAN.md                       # Project roadmap
├── PROGRESS.md                   # Session tracking
└── README.md                     # Project documentation
```

---

## Naming Conventions

### Files
```
PascalCase.tsx        → React components
camelCase.ts          → Utilities, helpers
kebab-case.md         → Content files
kebab-case.jpg        → Image files
```

### Components
```typescript
// Named exports for components
export function Header() { }
export function PageContainer() { }

// Default exports for pages
export default function HomePage() { }
```

### Types
```typescript
// PascalCase for interfaces and types
export interface WorkMeta { }
export type CategorySlug = 'installations' | 'sculptures';
```

### Functions
```typescript
// camelCase for functions
export function getWorkMeta() { }
export function getAllCategories() { }
```

---

## App Router Structure

### Page Organization

**Static Pages:**
```
app/page.tsx              → /
app/about/page.tsx        → /about
app/contact/page.tsx      → /contact
```

**Dynamic Pages:**
```
app/works/page.tsx               → /works
app/works/[slug]/page.tsx        → /works/installations
                                 → /works/the-escape
```

**Special Files:**
```
app/layout.tsx            → Root layout (wraps all pages)
app/not-found.tsx         → 404 page
app/loading.tsx           → Loading state
app/error.tsx             → Error boundary
```

---

## Component Organization

### Barrel Exports (index pattern)

**`components/ui/Layout.tsx`**
```typescript
export { PageContainer } from './PageContainer';
export { PageSection } from './PageSection';
export { ContentStack } from './ContentStack';
export { Grid } from './Grid';
export { Card } from './Card';
export { HeaderContainer } from './HeaderContainer';
export { FooterContainer } from './FooterContainer';
```

**Usage:**
```typescript
import { PageContainer, PageSection, Grid } from '@/components/ui/Layout';
```

### Component File Structure
```typescript
// 1. Imports
import { ComponentProps } from './types';

// 2. Component definition
export function Component({ prop1, prop2 }: ComponentProps) {
  // 3. Logic (minimal)

  // 4. JSX
  return (
    <div>...</div>
  );
}
```

---

## Content Organization

### Markdown File Structure

**Example: `content/works/the-escape.md`**
```markdown
---
title: "The Escape"
year: 2024
categories: ['installations', 'text-informed']
materials: "Mixed media"
dimensions: "Variable"
coverImage: "/images/works/the-escape/cover.jpg"
images:
  - "/images/works/the-escape/01.jpg"
  - "/images/works/the-escape/02.jpg"
shortDescription: "Brief description for cards"
featured: true
---

Full description in markdown.

Supports **bold**, *italic*, and other markdown features.
```

### Image Organization

**Consistent naming:**
```
public/images/works/[work-slug]/
  ├── cover.jpg       ← Main cover image
  ├── 01.jpg          ← Additional image 1
  ├── 02.jpg          ← Additional image 2
  └── ...
```

**Naming rules:**
- Always `cover.jpg` for main image
- Number additional images: `01.jpg`, `02.jpg`, etc.
- Use zero-padded numbers for consistency
- Keep filenames lowercase
- Use hyphens not spaces

---

## Lib Organization

### `lib/types.ts`
All TypeScript interfaces and types

### `lib/content.ts`
Functions to read and parse content:
- `getHomePageContent()`
- `getAboutPageContent()`
- `getAllWorksMeta()`
- `getWork(slug)`
- etc.

### `lib/categories.ts`
Category configuration:
- Category definitions
- Helper functions
- Type guards

---

## Import Aliases

**`tsconfig.json`**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Usage:**
```typescript
// Instead of:
import { getWork } from '../../../lib/content';

// Use:
import { getWork } from '@/lib/content';
```

---

## Route Organization Strategies

### Strategy 1: Flat Structure
```
app/works/[slug]/page.tsx
```
Handles both:
- `/works/installations` (category)
- `/works/the-escape` (individual work)

**Pros:** Simple, fewer files
**Cons:** Logic in one file to handle both cases

### Strategy 2: Nested Structure
```
app/works/page.tsx              → /works
app/works/[category]/page.tsx   → /works/installations
app/works/[category]/[slug]/page.tsx → /works/installations/the-escape
```

**Pros:** Explicit, clear separation
**Cons:** More files, deeper nesting

**Choice:** Use Strategy 1 for portfolios, Strategy 2 for complex sites

---

## Content vs Code Boundary

### ❌ Don't Do This
```typescript
// Component with hardcoded content
export function Hero() {
  return (
    <h1>Welcome to my portfolio</h1>
  );
}
```

### ✅ Do This
```typescript
// Component receives content via props
export function Hero({ content }: { content: HomePageContent }) {
  return (
    <h1>{content.title}</h1>
  );
}
```

---

## File Size Guidelines

**Keep files focused:**
- Components: < 200 lines
- Utilities: < 300 lines
- Pages: < 150 lines (mostly imports + layout)

**When to split:**
- File > 300 lines → extract components/utilities
- Multiple responsibilities → separate files
- Reused logic → move to utilities

---

## Configuration Files Location

```
Root level:
- package.json
- tsconfig.json
- tailwind.config.ts
- next.config.js
- .env.local
- .gitignore
- CLAUDE.md
- PLAN.md
- PROGRESS.md
- README.md
```

**Don't nest config files!**

---

## Build Output

```
.next/                    # Next.js build output (Git ignored)
out/                      # Static export (if used)
node_modules/             # Dependencies (Git ignored)
```

---

## Summary Checklist

- [ ] `app/` for pages and routes
- [ ] `components/` organized by purpose (layout/ui/home)
- [ ] `content/` for all markdown files
- [ ] `lib/` for utilities and types
- [ ] `public/` for static assets
- [ ] Import aliases configured (`@/*`)
- [ ] Barrel exports for UI components
- [ ] Consistent naming conventions
- [ ] Clear separation: code vs content
- [ ] Images organized by entity (works/profile/etc.)

---

**Next:** `03-CONTENT-SYSTEM.md` →
