# 04 – UI Components System

> Reusable, type-safe components with systematic spacing

---

## Core Principle

**No hardcoded spacing. Everything through components.**

```typescript
// ❌ BAD - Hardcoded spacing
<div className="py-16 px-6 max-w-7xl mx-auto">
  <div className="space-y-8">
    ...
  </div>
</div>

// ✅ GOOD - Component-based spacing
<PageContainer maxWidth="base">
  <PageSection spacing="lg">
    <ContentStack spacing="md">
      ...
    </ContentStack>
  </PageSection>
</PageContainer>
```

---

## Component Architecture

### Layout Components Hierarchy

```
PageContainer           → Horizontal padding + max-width
  ↓
PageSection            → Vertical spacing (top/bottom padding)
  ↓
ContentStack           → Spacing between child elements
  ↓
Grid / Card            → Structured content layout
```

---

## 1. Type System

**`components/ui/types.ts`**
```typescript
// Max-width variants
export type MaxWidth = 'base' | 'narrow' | 'wide';

// Vertical spacing variants
export type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

// Grid columns
export type GridColumns = 1 | 2 | 3 | 4;

// Gap sizes
export type Gap = 'sm' | 'md' | 'lg' | 'xl';

// Component props interfaces
export interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  noPadding?: boolean;
}

export interface PageSectionProps {
  children: React.ReactNode;
  spacing?: Spacing;
  className?: string;
}

export interface ContentStackProps {
  children: React.ReactNode;
  spacing?: Spacing;
  className?: string;
}

export interface GridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: Gap;
  className?: string;
}

export interface CardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  aspectRatio?: string;
}
```

---

## 2. PageContainer

**Horizontal padding + max-width wrapper**

**`components/ui/PageContainer.tsx`**
```typescript
import { PageContainerProps } from './types';

export function PageContainer({
  children,
  maxWidth = 'base',
  noPadding = false
}: PageContainerProps) {
  const widthClasses = {
    base: 'max-w-7xl',      // 1280px
    narrow: 'max-w-4xl',    // 896px
    wide: 'max-w-6xl',      // 1152px
  };

  return (
    <div className={`mx-auto ${widthClasses[maxWidth]} ${noPadding ? '' : 'px-6 lg:px-8'}`}>
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<PageContainer maxWidth="narrow">
  <h1>About</h1>
</PageContainer>
```

---

## 3. PageSection

**Vertical spacing (top/bottom padding)**

**`components/ui/PageSection.tsx`**
```typescript
import { PageSectionProps } from './types';

export function PageSection({
  children,
  spacing = 'md',
  className = ''
}: PageSectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',      // 32px → 48px
    md: 'py-12 sm:py-16',     // 48px → 64px
    lg: 'py-16 lg:py-24',     // 64px → 96px
    xl: 'py-24 sm:py-32',     // 96px → 128px
  };

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
```

**Usage:**
```typescript
<PageSection spacing="lg">
  <h2>Featured Works</h2>
</PageSection>
```

---

## 4. ContentStack

**Spacing between child elements**

**`components/ui/ContentStack.tsx`**
```typescript
import { ContentStackProps } from './types';

export function ContentStack({
  children,
  spacing = 'md',
  className = ''
}: ContentStackProps) {
  const spacingClasses = {
    none: '',
    sm: 'space-y-4',      // 16px
    md: 'space-y-8',      // 32px
    lg: 'space-y-12',     // 48px
    xl: 'space-y-16',     // 64px
  };

  return (
    <div className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<ContentStack spacing="lg">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
</ContentStack>
```

---

## 5. Grid

**Responsive grid layouts**

**`components/ui/Grid.tsx`**
```typescript
import { GridProps } from './types';

export function Grid({
  children,
  columns = 3,
  gap = 'md',
  className = ''
}: GridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',      // 16px
    md: 'gap-8',      // 32px
    lg: 'gap-12',     // 48px
    xl: 'gap-16',     // 64px
  };

  return (
    <div className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<Grid columns={3} gap="lg">
  <Card {...work1} />
  <Card {...work2} />
  <Card {...work3} />
</Grid>
```

---

## 6. Card

**Reusable image + text content block**

**`components/ui/Card.tsx`**
```typescript
import Image from 'next/image';
import Link from 'next/link';
import { CardProps } from './types';

export function Card({
  image,
  imageAlt,
  title,
  subtitle,
  description,
  href,
  aspectRatio = 'aspect-[4/3]',
}: CardProps) {
  return (
    <Link href={href} className="group block">
      <div className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className={`relative ${aspectRatio} overflow-hidden rounded-lg bg-gray-100`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
```

**Usage:**
```typescript
<Card
  image={work.coverImage}
  imageAlt={work.title}
  title={work.title}
  subtitle={`${work.year} · ${work.materials}`}
  description={work.shortDescription}
  href={`/works/${work.slug}`}
/>
```

---

## 7. Specialized Containers

### HeaderContainer

**`components/ui/HeaderContainer.tsx`**
```typescript
export function HeaderContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {children}
    </div>
  );
}
```

### FooterContainer

**`components/ui/FooterContainer.tsx`**
```typescript
export function FooterContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {children}
    </div>
  );
}
```

---

## 8. Barrel Export

**`components/ui/Layout.tsx`**
```typescript
export { PageContainer } from './PageContainer';
export { PageSection } from './PageSection';
export { ContentStack } from './ContentStack';
export { Grid } from './Grid';
export { Card } from './Card';
export { HeaderContainer } from './HeaderContainer';
export { FooterContainer } from './FooterContainer';

export type { MaxWidth, Spacing, GridColumns, Gap } from './types';
export type {
  PageContainerProps,
  PageSectionProps,
  ContentStackProps,
  GridProps,
  CardProps,
} from './types';
```

**Usage:**
```typescript
import { PageContainer, PageSection, Grid, Card } from '@/components/ui/Layout';
```

---

## Real-World Example

### Complete Page Layout

```typescript
import { PageContainer, PageSection, Grid, Card } from '@/components/ui/Layout';
import { getWorksByCategorySlug } from '@/lib/content';

export default function CategoryPage() {
  const works = getWorksByCategorySlug('installations');

  return (
    <PageContainer maxWidth="base">
      <PageSection spacing="lg">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">Installations</h1>
          <p className="mt-4 text-lg text-gray-600">
            Spatial works engaging material, scale, and context
          </p>
        </div>

        <Grid columns={3} gap="lg">
          {works.map((work) => (
            <Card
              key={work.slug}
              image={work.coverImage}
              imageAlt={work.title}
              title={work.title}
              subtitle={`${work.year} · ${work.materials}`}
              description={work.shortDescription}
              href={`/works/${work.slug}`}
            />
          ))}
        </Grid>
      </PageSection>
    </PageContainer>
  );
}
```

---

## Spacing System Reference

### Vertical Spacing (PageSection)
```
none → no padding
sm   → py-8 sm:py-12    (32px → 48px)
md   → py-12 sm:py-16   (48px → 64px)
lg   → py-16 lg:py-24   (64px → 96px)
xl   → py-24 sm:py-32   (96px → 128px)
```

### Horizontal Padding (PageContainer)
```
base → px-6 lg:px-8     (24px → 32px)
```

### Max Width Variants
```
base   → max-w-7xl      (1280px)
narrow → max-w-4xl      (896px)
wide   → max-w-6xl      (1152px)
```

### Grid Gaps
```
sm → gap-4   (16px)
md → gap-8   (32px)
lg → gap-12  (48px)
xl → gap-16  (64px)
```

### Content Stack Spacing
```
sm → space-y-4   (16px)
md → space-y-8   (32px)
lg → space-y-12  (48px)
xl → space-y-16  (64px)
```

---

## Migration Strategy

### When Adding Components to Existing Project

**Phase 1: Create Components**
```bash
# Create all UI components first
components/ui/types.ts
components/ui/PageContainer.tsx
components/ui/PageSection.tsx
components/ui/ContentStack.tsx
components/ui/Grid.tsx
components/ui/Card.tsx
components/ui/Layout.tsx  # Barrel export
```

**Phase 2: Migrate Incrementally**
```
1. Layout components (Header, Footer)
2. Home page components
3. Static pages (About, Contact)
4. Works pages
5. Loading states
```

**Phase 3: Cleanup**
```
- Remove old spacing utilities
- Verify build successful
- Check all pages render correctly
```

---

## Additional UI Components

### Lightbox (Image Viewer)

**`components/Lightbox.tsx`**
```typescript
'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Lightbox({ images, currentIndex, onClose, onNext, onPrevious }: LightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrevious();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onNext, onPrevious]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
      >
        ×
      </button>

      {/* Image */}
      <div className="flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto object-contain"
        />
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrevious(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:scale-110 transition-transform"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl hover:scale-110 transition-transform"
          >
            ›
          </button>
        </>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
```

### PageTransition

**`components/PageTransition.tsx`**
```typescript
'use client';

import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}
```

---

## Component Best Practices

### 1. Always Type Props
```typescript
interface ComponentProps {
  title: string;
  description?: string;  // Optional props clearly marked
}

export function Component({ title, description }: ComponentProps) {
  // ...
}
```

### 2. Use Sensible Defaults
```typescript
export function PageSection({
  spacing = 'md',  // Default value
  className = ''
}: PageSectionProps) {
  // ...
}
```

### 3. Allow Customization
```typescript
// Accept className for one-off adjustments
<PageSection spacing="lg" className="bg-gray-50">
  ...
</PageSection>
```

### 4. Keep Components Focused
```typescript
// ✅ GOOD - Single responsibility
export function Card({ image, title, href }: CardProps) { }

// ❌ BAD - Too many responsibilities
export function CardWithModalAndAnalytics() { }
```

### 5. Compose Components
```typescript
// Build complex layouts from simple components
<PageContainer>
  <PageSection>
    <Grid>
      <Card />
      <Card />
    </Grid>
  </PageSection>
</PageContainer>
```

---

## Component Checklist

- [ ] All spacing through components (no hardcoded classes)
- [ ] TypeScript interfaces for all props
- [ ] Barrel export for easy imports
- [ ] Sensible default values
- [ ] Customization via className prop
- [ ] Responsive design built-in
- [ ] Reusable across pages
- [ ] Components composed, not monolithic

---

**Next:** `05-WORKFLOW.md` →
