# 01 – Project Setup

> Initial setup, stack choices, and configuration

---

## Tech Stack Decision

### Core Stack
```json
{
  "framework": "Next.js 14+ (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "content": "Markdown + Frontmatter",
  "hosting": "Vercel"
}
```

### Why These Choices?

**Next.js 14+ with App Router**
- Server Components by default (better performance)
- Built-in image optimization
- File-based routing
- Static site generation (SSG)
- Easy Vercel deployment

**TypeScript (Strict Mode)**
- Type safety prevents runtime errors
- Better IDE autocomplete
- Self-documenting code
- Easier refactoring

**Tailwind CSS**
- Utility-first approach
- No separate CSS files
- Consistent design system
- Easy responsive design
- Small production bundle

**Markdown + Frontmatter**
- Content separated from code
- Easy to edit without developer
- Version controlled
- No database needed (Phase 1)
- Simple migration to CMS later

---

## Initial Setup Commands

### 1. Create Next.js Project
```bash
npx create-next-app@latest my-project --typescript --tailwind --app
cd my-project
```

### 2. Install Dependencies
```bash
npm install gray-matter remark remark-html
npm install --save-dev @tailwindcss/typography
```

### 3. Additional Tools (Optional)
```bash
npm install @headlessui/react @heroicons/react
npm install --save-dev tsx vercel
```

---

## Configuration Files

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,              // ← IMPORTANT: Strict mode
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // For markdown rendering
  ],
}
export default config
```

### `.gitignore`
```
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### `package.json` Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## Project Structure (Initial)

```
my-project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   ├── ui/
│   └── home/
├── content/
│   ├── pages/
│   └── (data folders - see 03-CONTENT-SYSTEM.md)
├── lib/
│   ├── types.ts
│   ├── content.ts
│   └── utils.ts
├── public/
│   ├── images/
│   └── (static assets)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── CLAUDE.md          ← Instructions for Claude Code
├── PLAN.md            ← Project roadmap
├── PROGRESS.md        ← Session progress tracking
└── README.md          ← Project documentation
```

---

## Key Dependencies Explained

### Production Dependencies
```json
{
  "gray-matter": "^4.0.3",        // Parse markdown frontmatter
  "next": "^14.2.0",              // Framework
  "react": "^18.3.0",             // UI library
  "react-dom": "^18.3.0",         // React DOM
  "remark": "^15.0.1",            // Markdown parser
  "remark-html": "^16.0.1"        // Markdown → HTML
}
```

### Dev Dependencies
```json
{
  "@tailwindcss/typography": "^0.5.19",  // Prose styles for markdown
  "@types/node": "^20",                   // Node.js types
  "@types/react": "^18",                  // React types
  "@types/react-dom": "^18",              // React DOM types
  "autoprefixer": "^10.4.0",              // CSS vendor prefixes
  "eslint": "^8",                         // Linting
  "eslint-config-next": "^14.2.0",        // Next.js ESLint rules
  "postcss": "^8",                        // CSS processing
  "tailwindcss": "^3.4.0",                // Utility CSS
  "tsx": "^4.21.0",                       // Run TypeScript scripts
  "typescript": "^5",                     // TypeScript compiler
  "vercel": "^50.1.3"                     // Deployment CLI
}
```

---

## Environment Variables

### `.env.local` (Git ignored)
```bash
# Site URL (for metadata, sitemap, etc.)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Future: Analytics, CMS, etc.
# NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
```

### `.env.production` (On Vercel)
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Initial File Setup

### `app/layout.tsx` (Root Layout)
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Project',
  description: 'Project description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Essential Files to Create

### `CLAUDE.md`
Claude Code instructions (see `05-WORKFLOW.md`)

### `PLAN.md`
```markdown
# Project Plan

## Phase 1: Core Features
- [ ] Task 1
- [ ] Task 2

## Phase 2: Enhancements
- [ ] Task 3

## Phase 3: Launch
- [ ] SEO
- [ ] Performance
```

### `PROGRESS.md`
```markdown
# Project Progress

**Last Updated:** YYYY-MM-DD
**Branch:** development
**Current Focus:** Initial setup

---

## Latest Session (YYYY-MM-DD)

### Completed Today
- ✅ Project initialized
- ✅ Dependencies installed

### Next Steps
1. Set up folder structure
2. Create type definitions
```

---

## Verify Installation

### 1. Start Dev Server
```bash
npm run dev
```
Visit http://localhost:3000

### 2. Test Build
```bash
npm run build
```
Should complete without errors

### 3. Lint Check
```bash
npm run lint
```
Should pass without warnings

---

## Next Steps

1. ✅ Project set up
2. → Read `02-ARCHITECTURE.md` - Set up folder structure
3. → Read `03-CONTENT-SYSTEM.md` - Create content system
4. → Read `04-UI-COMPONENTS.md` - Build components

---

## Common Issues & Solutions

### TypeScript Errors After Install
```bash
npm run build  # Generates Next.js types
```

### Tailwind Not Working
Check `tailwind.config.ts` content paths include your files

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Next:** `02-ARCHITECTURE.md` →
