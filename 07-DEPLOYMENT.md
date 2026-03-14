# 07 – Deployment

> Deploy to production with Vercel

---

## Deployment Strategy

```
Local Development
      ↓
Git (development branch)
      ↓
GitHub Repository
      ↓
Vercel (auto-deploy)
      ↓
Production (yulia-art.vercel.app)
```

---

## Vercel Setup

### Initial Setup

**1. Install Vercel CLI**
```bash
npm install --save-dev vercel
```

**2. Login to Vercel**
```bash
npx vercel login
```

**3. Link Project**
```bash
npx vercel link
```

Follow prompts:
- Link to existing project? → Yes (if exists) or No (create new)
- What's your project name? → `your-project-name`
- In which directory is your code located? → `./`

**4. Configure Project on Vercel Dashboard**
- Go to https://vercel.com/dashboard
- Select your project
- Settings → General:
  - Framework Preset: Next.js
  - Root Directory: `./`
  - Build Command: `next build`
  - Output Directory: `.next`

---

## Environment Variables

### Local (.env.local)
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Vercel Dashboard)

**Add environment variables:**
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://your-domain.com
   Environment: Production
   ```

**Other common variables:**
```bash
# Analytics (if using)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# API keys (if needed)
API_KEY=your-secret-key

# CMS (Phase 2)
SANITY_PROJECT_ID=your-project-id
SANITY_TOKEN=your-token
```

**Important:**
- Prefix with `NEXT_PUBLIC_` for client-side access
- Never commit `.env.local` to Git
- Set production values in Vercel dashboard

---

## Git Workflow for Deployment

### Branch Strategy

```
main          → Production (auto-deploy to Vercel)
  ↓
development   → Working branch (also auto-deploy for preview)
```

### Standard Deployment Flow

**1. Make changes locally**
```bash
# Verify everything works
npm run build
npm run lint
```

**2. Commit changes**
```bash
git add .
git commit -m "feat(works): add new artwork collection"
```

**3. Push to GitHub**
```bash
git push origin development
```

**4. Vercel auto-deploys**
- Preview deployment created automatically
- Check deployment URL in terminal or Vercel dashboard

**5. Merge to main (when ready)**
```bash
git checkout main
git merge development
git push origin main
```

**6. Production deployment**
- Vercel auto-deploys to production
- Live at your-domain.com

---

## Manual Deployment

### Deploy to Production
```bash
npx vercel --prod --yes
```

### Deploy to Preview
```bash
npx vercel
```

**Flags:**
- `--prod` - Deploy to production domain
- `--yes` - Skip confirmation prompts
- `--force` - Force rebuild

---

## Automated Workflow

### When User Says: "save and deploy"

Claude executes:
```bash
git add .
git commit -m "descriptive message"
git push origin development
npx vercel --prod --yes
```

**Important rules:**
- ✅ Create meaningful commit messages
- ✅ Push to GitHub first
- ✅ Deploy to production
- ❌ DO NOT kill local dev server
- ❌ DO NOT use `--force` unless explicitly requested

---

## Pre-Deployment Checklist

### Every Deployment

**Local verification:**
```bash
npm run lint          # No errors
npm run build         # Successful build
```

**Check:**
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All pages generate correctly
- [ ] No console errors in browser

### Major Deployments

**Additional checks:**
- [ ] Lighthouse audit (90+ scores)
- [ ] Mobile responsive
- [ ] Images optimized
- [ ] Meta tags correct
- [ ] Links working
- [ ] Forms functional
- [ ] Cross-browser tested

---

## Vercel Configuration

### next.config.js

**Basic configuration:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optional: for Docker
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
```

**With custom domain:**
```javascript
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

### vercel.json (Optional)

**Custom configuration:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## Custom Domain Setup

### Add Domain on Vercel

**1. Go to Project Settings → Domains**

**2. Add your domain:**
```
your-domain.com
www.your-domain.com
```

**3. Configure DNS:**

**Option A: Vercel DNS (Recommended)**
- Point nameservers to Vercel
- Automatic SSL certificate
- Vercel manages everything

**Option B: External DNS**
Add these records:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**4. Wait for DNS propagation (up to 48 hours)**

**5. Verify:**
- https://your-domain.com works
- https://www.your-domain.com works
- SSL certificate active (🔒 in browser)

---

## Build Optimization

### Reduce Build Time

**1. Use caching:**
Vercel automatically caches:
- node_modules
- .next/cache
- Installed dependencies

**2. Optimize images before upload:**
```bash
# Use scripts to compress images
python scripts/compress-images.py
```

**3. Minimize dependencies:**
```bash
# Remove unused packages
npm prune
```

### Reduce Bundle Size

**Analyze bundle:**
```bash
npm install --save-dev @next/bundle-analyzer
```

**next.config.js:**
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

**Run analysis:**
```bash
ANALYZE=true npm run build
```

---

## Monitoring & Analytics

### Vercel Analytics

**Enable in Project Settings:**
- Go to Analytics tab
- Enable Web Analytics
- No code changes needed

**Tracks:**
- Page views
- Real User Metrics
- Core Web Vitals
- Performance scores

### Google Analytics (Optional)

**1. Create GA property**

**2. Add to .env.local:**
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**3. Add to Vercel environment variables**

**4. Create tracking component:**
```typescript
// lib/analytics.ts
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    })
  }
}

export const event = ({ action, params }: {
  action: string
  params?: Record<string, any>
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}
```

**5. Track page views:**
```typescript
// app/layout.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { pageview } from '@/lib/analytics'

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  return null
}
```

---

## Error Handling

### Common Deployment Errors

**Build fails:**
```
Error: Command "npm run build" exited with 1
```

**Solution:**
1. Run `npm run build` locally
2. Fix TypeScript/ESLint errors
3. Commit and push fixes

**Module not found:**
```
Error: Cannot find module 'package-name'
```

**Solution:**
```bash
# Ensure dependency in package.json
npm install package-name
git add package.json package-lock.json
git commit -m "fix: add missing dependency"
git push
```

**Environment variable missing:**
```
Error: NEXT_PUBLIC_SITE_URL is not defined
```

**Solution:**
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add missing variable
4. Redeploy

---

## Rollback Strategy

### Revert to Previous Deployment

**Option 1: Vercel Dashboard**
1. Go to Deployments
2. Find working deployment
3. Click "..." → Promote to Production

**Option 2: Git Revert**
```bash
git revert HEAD
git push origin main
```

**Option 3: Redeploy Specific Commit**
```bash
git checkout [commit-hash]
npx vercel --prod --yes
git checkout main  # Return to main
```

---

## Performance Optimization

### Image Optimization

**Automatic (Next.js Image):**
```typescript
import Image from 'next/image'

<Image
  src="/images/work.jpg"
  alt="Artwork"
  width={800}
  height={600}
  quality={85}
  priority  // For above-the-fold images
/>
```

**Manual compression:**
```bash
# Before adding to project
python scripts/compress-images.py
```

### Lighthouse Audit

**Run before deployment:**
```bash
npm run build
npm run start

# In another terminal
npx lighthouse http://localhost:3000 --view
```

**Target scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

### Caching Strategy

**next.config.js:**
```javascript
const nextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

---

## SEO Checklist

### Before Launch

- [ ] **sitemap.xml** - Auto-generated or static
- [ ] **robots.txt** - Configured correctly
- [ ] **Meta tags** - All pages have title, description
- [ ] **OpenGraph** - Social media previews work
- [ ] **Structured data** - JSON-LD for rich results
- [ ] **Canonical URLs** - Set correctly
- [ ] **404 page** - Custom, helpful
- [ ] **Mobile-friendly** - Responsive design
- [ ] **HTTPS** - SSL certificate active
- [ ] **Performance** - Lighthouse 90+

### Generate sitemap.xml

**Static approach:**
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/about</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Dynamic approach:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllWorkSlugs } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'

  const works = getAllWorkSlugs().map((slug) => ({
    url: `${baseUrl}/works/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...works,
  ]
}
```

### robots.txt

**public/robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

---

## Deployment Workflow Summary

### Standard Flow

```bash
# 1. Verify locally
npm run lint
npm run build

# 2. Commit changes
git add .
git commit -m "feat: add new feature"

# 3. Push to GitHub
git push origin development

# 4. Deploy to production
npx vercel --prod --yes

# 5. Verify deployment
# Check Vercel dashboard for deployment URL
# Test on production domain
```

### Quick Deploy (Claude executes)

When user says "save and deploy":
```bash
git add . && \
git commit -m "update: [description]" && \
git push origin development && \
npx vercel --prod --yes
```

---

## Post-Deployment Tasks

### After First Deployment

- [ ] Test all pages on production
- [ ] Verify images load correctly
- [ ] Test contact form (if applicable)
- [ ] Check mobile responsiveness
- [ ] Test social media sharing
- [ ] Submit sitemap to Google Search Console
- [ ] Set up analytics
- [ ] Monitor Core Web Vitals

### Regular Maintenance

- [ ] Monitor Vercel analytics
- [ ] Check for 404 errors
- [ ] Update dependencies monthly
- [ ] Review performance scores
- [ ] Backup content regularly

---

## Troubleshooting

### Deployment Hangs

**Check:**
- Vercel status: https://www.vercel-status.com
- Build logs in Vercel dashboard
- GitHub Actions (if using)

**Solution:**
```bash
# Cancel deployment
# Fix issue locally
npm run build  # Verify works
git commit -m "fix: resolve build issue"
git push
```

### 404 on All Routes

**Cause:** Misconfigured output or routes

**Solution:**
1. Check `next.config.js`
2. Verify App Router structure (`app/` not `pages/`)
3. Redeploy

### Images Not Loading

**Cause:** Missing images or incorrect paths

**Solution:**
1. Verify images in `public/images/`
2. Check paths start with `/images/...`
3. Ensure images committed to Git
4. Redeploy

---

## Summary Checklist

- [ ] Vercel project set up
- [ ] Environment variables configured
- [ ] Git workflow established
- [ ] Custom domain (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] SEO optimized (sitemap, meta tags)
- [ ] Performance audit passed
- [ ] Error monitoring set up
- [ ] Deployment workflow documented

---

**Deployment complete!** 🚀

Your Next.js project is now live and optimized for production.
