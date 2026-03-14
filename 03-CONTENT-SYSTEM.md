# 03 – Content System

> Zero hard-coding: All content in markdown with TypeScript types

---

## Core Principle

**Content lives outside components.**

```
Components      ←  receive data from  ←     Content Utilities
(presentation)                              (lib/content.ts)
                                                   ↓
                                            Read & Parse
                                                   ↓
                                            Markdown Files
                                            (content/)
```

---

## Content Architecture

### Layer 1: Markdown Files
Store actual content with frontmatter

### Layer 2: TypeScript Types
Define structure and enforce types

### Layer 3: Content Utilities
Read, parse, and transform content

### Layer 4: Components
Receive typed content via props

---

## Markdown + Frontmatter

### Example: Work Content

**`content/works/the-escape.md`**
```markdown
---
title: "The Escape"
year: 2024
categories: ['installations', 'text-informed']
materials: "Mixed media, found objects"
dimensions: "Variable"
coverImage: "/images/works/the-escape/cover.jpg"
images:
  - "/images/works/the-escape/01.jpg"
  - "/images/works/the-escape/02.jpg"
  - "/images/works/the-escape/03.jpg"
shortDescription: "Immersive installation exploring displacement"
featured: true
---

Full description of the work in markdown.

This work explores themes of **displacement**, *memory*, and resilience.

## Background

Created during...

## Materials

The installation uses...
```

### Example: Page Content

**`content/pages/about.md`**
```markdown
---
title: "About"
profileImage: "/images/profile/artist-portrait.jpg"
profileImageAlt: "Artist portrait"
downloadCvText: "Download CV"
---

# About the Artist

Full biography in markdown...

Born in Ukraine, based in UK...
```

---

## TypeScript Type System

### Step 1: Define Types

**`lib/types.ts`**
```typescript
// Work metadata (from frontmatter)
export interface WorkMeta {
  title: string;
  slug: string;              // Generated from filename
  year: number;
  categories: CategorySlug[];
  materials: string;
  dimensions: string;
  coverImage: string;
  images: string[];
  shortDescription: string;
  featured: boolean;
}

// Full work (with content)
export interface Work extends WorkMeta {
  content: string;           // HTML from markdown
}

// Page content
export interface AboutPageContent {
  title: string;
  profileImage: string;
  profileImageAlt: string;
  downloadCvText: string;
  content: string;           // HTML from markdown
}

// Categories
export type CategorySlug =
  | 'installations'
  | 'sculptures'
  | 'paintings'
  | 'ceramics'
  | 'text-informed';
```

### Step 2: Content Utilities

**`lib/content.ts`**
```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Work, WorkMeta, AboutPageContent } from './types';

const contentDirectory = path.join(process.cwd(), 'content');
const worksDirectory = path.join(contentDirectory, 'works');

/**
 * Generic markdown reader
 */
function readMarkdownFile<T>(filePath: string): { data: T; content: string } {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data: data as T, content };
}

/**
 * Get about page content
 */
export function getAboutPageContent(): AboutPageContent {
  const { data, content } = readMarkdownFile<Omit<AboutPageContent, 'content'>>('pages/about.md');
  return { ...data, content };
}

/**
 * Get work metadata (no content)
 */
export function getWorkMeta(slug: string): WorkMeta {
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    ...data,
    slug,
  } as WorkMeta;
}

/**
 * Get full work with HTML content (async)
 */
export async function getWork(slug: string): Promise<Work> {
  const fullPath = path.join(worksDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown → HTML
  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    ...data,
    slug,
    content: processedContent.toString(),
  } as Work;
}

/**
 * Get all work slugs (for static generation)
 */
export function getAllWorkSlugs(): string[] {
  const fileNames = fs.readdirSync(worksDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

/**
 * Get all works metadata
 */
export function getAllWorksMeta(): WorkMeta[] {
  const slugs = getAllWorkSlugs();
  return slugs.map((slug) => getWorkMeta(slug));
}
```

### Step 3: Use in Pages

**`app/about/page.tsx`**
```typescript
import { getAboutPageContent } from '@/lib/content';

export default function AboutPage() {
  const content = getAboutPageContent();

  return (
    <div>
      <h1>{content.title}</h1>
      <img src={content.profileImage} alt={content.profileImageAlt} />
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </div>
  );
}
```

**`app/works/[slug]/page.tsx`**
```typescript
import { getWork, getAllWorkSlugs } from '@/lib/content';

// Generate static paths
export async function generateStaticParams() {
  const slugs = getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Page component
export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await getWork(params.slug);

  return (
    <div>
      <h1>{work.title}</h1>
      <p>{work.year} · {work.materials}</p>
      <img src={work.coverImage} alt={work.title} />
      <div dangerouslySetInnerHTML={{ __html: work.content }} />
    </div>
  );
}
```

---

## Category System

### Category Configuration

**`lib/categories.ts`**
```typescript
import { CategorySlug } from './types';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  installations: {
    slug: 'installations',
    name: 'Installations',
    description: 'Spatial works engaging material, scale, and context',
  },
  sculptures: {
    slug: 'sculptures',
    name: 'Sculptures',
    description: 'Sculptural works using found objects',
  },
  paintings: {
    slug: 'paintings',
    name: 'Paintings',
    description: 'Material-based paintings using natural pigments',
  },
  ceramics: {
    slug: 'ceramics',
    name: 'Ceramic Works',
    description: 'Ceramic objects and modular structures',
  },
  'text-informed': {
    slug: 'text-informed',
    name: 'Text-Informed & Archival Works',
    description: 'Works engaging text, archival materials',
  },
};

export const CATEGORY_ORDER: CategorySlug[] = [
  'installations',
  'sculptures',
  'paintings',
  'ceramics',
  'text-informed',
];

// Type guard
export function isCategorySlug(slug: string): slug is CategorySlug {
  return slug in CATEGORIES;
}

// Get category by slug
export function getCategoryBySlug(slug: CategorySlug): Category {
  return CATEGORIES[slug];
}
```

### Category-Based Queries

**`lib/content.ts` (continued)**
```typescript
/**
 * Get works by category (with ordering)
 */
export function getWorksByCategorySlug(category: CategorySlug): WorkMeta[] {
  const allWorks = getAllWorksMeta();
  return allWorks.filter((work) => work.categories.includes(category));
}

/**
 * Get featured works
 */
export function getFeaturedWorks(): WorkMeta[] {
  return getAllWorksMeta()
    .filter((work) => work.featured)
    .sort((a, b) => b.year - a.year);
}
```

---

## Content Ordering

### Option 1: Manual Order File

**`content/category-order.json`**
```json
{
  "installations": [
    "the-escape",
    "lost-dreams",
    "stolen-voice-of-ukraine"
  ],
  "sculptures": [
    "the-weight-of-silence",
    "scattered-bonds"
  ]
}
```

**Read order:**
```typescript
function getCategoryOrder(): Record<CategorySlug, string[]> {
  const path = join(process.cwd(), 'content/category-order.json');
  const fileContents = fs.readFileSync(path, 'utf8');
  return JSON.parse(fileContents);
}

export function getWorksByCategorySlug(category: CategorySlug): WorkMeta[] {
  const order = getCategoryOrder();
  const orderedSlugs = order[category] || [];

  return orderedSlugs
    .map((slug) => getWorkMeta(slug))
    .filter((work) => work.categories.includes(category));
}
```

### Option 2: Frontmatter Order
```markdown
---
title: "Work Title"
order: 1
---
```

**Sort by order:**
```typescript
.sort((a, b) => a.order - b.order)
```

---

## Site Configuration

### Global Config File

**`content/site-config.md`**
```markdown
---
siteName: "Artist Name"
siteTitle: "Artist Name – Portfolio"
siteDescription: "Multidisciplinary artist..."
artistName: "Artist Name"
email: "hello@example.com"
instagram: "https://instagram.com/username"
instagramHandle: "@username"
copyright: "© 2025 Artist Name. All rights reserved."
cvFile: "/cv.pdf"

navigation:
  home: "Home"
  works: "Works"
  about: "About"
  contact: "Contact"
  openMenu: "Open menu"
  closeMenu: "Close menu"
---
```

**Read config:**
```typescript
export interface SiteConfig {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  artistName: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  copyright: string;
  cvFile: string;
  navigation: {
    home: string;
    works: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
}

export function getSiteConfig(): SiteConfig {
  const { data } = readMarkdownFile<SiteConfig>('site-config.md');
  return data;
}
```

---

## Best Practices

### 1. Keep Content Flat
```
✅ content/works/work-1.md
❌ content/works/2024/installations/work-1.md
```
Use frontmatter for categorization, not folders.

### 2. Validate with TypeScript
```typescript
// Type ensures all required fields present
const work: WorkMeta = getWorkMeta('the-escape');
```

### 3. Handle Missing Content
```typescript
export function getWorkMeta(slug: string): WorkMeta | null {
  const fullPath = path.join(worksDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;  // or throw error
  }

  // ...
}
```

### 4. Cache When Possible
```typescript
let cachedWorks: WorkMeta[] | null = null;

export function getAllWorksMeta(): WorkMeta[] {
  if (cachedWorks) return cachedWorks;

  const slugs = getAllWorkSlugs();
  cachedWorks = slugs.map((slug) => getWorkMeta(slug));
  return cachedWorks;
}
```

### 5. Use Frontmatter for Metadata Only
```markdown
---
title: "Work Title"       ← Metadata
year: 2024
materials: "Mixed media"
---

Full description here     ← Content (markdown)
```

---

## Markdown Features

### Supported Syntax
```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered item
2. Another item

[Link text](https://example.com)

> Blockquote
```

### Rendering with Tailwind Typography
```typescript
<div
  className="prose prose-gray max-w-none"
  dangerouslySetInnerHTML={{ __html: content }}
/>
```

---

## Content Checklist

- [ ] All content in `content/` folder
- [ ] TypeScript types for all content structures
- [ ] Content utilities in `lib/content.ts`
- [ ] Components receive content via props
- [ ] No hardcoded text in components
- [ ] Markdown files use frontmatter
- [ ] Categories configured in `lib/categories.ts`
- [ ] Site config in `site-config.md`

---

**Next:** `04-UI-COMPONENTS.md` →
