# 05 – Workflow & Claude Code Instructions

> How to work with Claude Code effectively

---

## CLAUDE.md File

Create `CLAUDE.md` in your project root. Claude Code reads this automatically.

### Complete Template

```markdown
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

**When user says "save and deploy":**
1. Create Git commit with descriptive message
2. Push to GitHub (`git push origin development`)
3. Deploy to Vercel production: `npx vercel --prod --yes`
4. **IMPORTANT:** DO NOT kill the local dev server

**Local dev server:**
- Should remain running during and after deployment
- User will manually stop it when needed
- Never kill dev server unless explicitly asked

## Project Context

[Your project description]

**Current Phase:** Phase 1 – Static portfolio site

**Design Reference:** [Design inspiration if any]

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

### Typography Rules (Optional - Adjust per project)
- **Always use en dash (–) not em dash (—)** in all content
- En dash is used for ranges, connections, and interruptions
- This applies to: markdown content, TypeScript strings, meta tags, all text

## Commands

```bash
npm run dev                    # Dev server (localhost:3000)
npm run build                  # Production build (test locally)
npm run lint                   # Lint check
npx vercel --prod --yes        # Deploy to production
```

## Key Requirements

1. **Language:** [English/Ukrainian/etc.]
2. **Design:** [Design style - minimalist/modern/etc.]
3. **Mobile-first:** Always consider mobile first
4. **Scalable:** Structure must allow for future enhancements
5. **Type-safe:** TypeScript strict mode, no `any`

## DO NOT

- Use Pages Router (App Router only)
- Create over-engineered abstractions
- Add unnecessary dependencies
- Hardcode content in components (use content/ folder)
- Use `any` types in TypeScript

## Current Status

See `PROGRESS.md` for latest updates.
See `PLAN.md` for project roadmap.

## [Project-Specific Info]

Add project-specific details here:
- API keys location
- Special conventions
- External services
- etc.
```

---

## PLAN.md Structure

Create `PLAN.md` to track roadmap.

```markdown
# Project Plan

## Phase 1: Core Features

### Pages
- [ ] Home page
- [ ] About page
- [ ] Contact page
- [ ] Works index page
- [ ] Individual work pages

### Content System
- [ ] TypeScript types
- [ ] Content utilities
- [ ] Markdown parsing
- [ ] Category system

### UI Components
- [ ] Layout components (Header, Footer)
- [ ] PageContainer, PageSection
- [ ] Grid, Card components
- [ ] Loading states
- [ ] 404 page

### SEO & Performance
- [ ] Meta tags for all pages
- [ ] OpenGraph tags
- [ ] JSON-LD structured data
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] Image optimization
- [ ] Lighthouse audit (90+ all scores)

## Phase 2: Enhancements (Future)

### Features
- [ ] Search functionality
- [ ] Filtering by category
- [ ] Contact form with backend
- [ ] Newsletter signup

### Performance
- [ ] Advanced image optimization
- [ ] Bundle size optimization
- [ ] Font optimization

### Analytics
- [ ] Analytics integration
- [ ] Event tracking
- [ ] Privacy policy

## Phase 3: Advanced (Future)

### CMS Integration
- [ ] Choose CMS (Sanity/Contentful)
- [ ] Migration strategy
- [ ] Admin panel setup

### E-commerce (If applicable)
- [ ] Shop functionality
- [ ] Payment integration
- [ ] Order management

---

## Pre-Launch Checklist

**Must-have before going live:**
- [ ] All pages have proper meta tags
- [ ] Images compressed and optimized
- [ ] Lighthouse scores 90+ (all metrics)
- [ ] Mobile testing complete
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] All links verified
- [ ] Contact methods working

**Nice-to-have:**
- [ ] Analytics setup
- [ ] Enhanced 404 page
- [ ] Page transitions
- [ ] Animation polish

---

## Technical Debt

Track known issues to fix later:
- [ ] Issue 1
- [ ] Issue 2
```

---

## PROGRESS.md Structure

Track what you've done each session.

```markdown
# Project Progress

**Last Updated:** 2025-01-15
**Branch:** development
**Current Focus:** Initial setup

---

## Latest Session (2025-01-15) - Project Setup

### Completed Today
- ✅ **Project Initialized:**
  - Created Next.js project with TypeScript
  - Installed dependencies (gray-matter, remark, etc.)
  - Configured Tailwind CSS
  - Set up folder structure

- ✅ **TypeScript Configuration:**
  - Enabled strict mode
  - Configured path aliases (@/*)
  - Created initial type definitions

- ✅ **Build Verification:**
  - Production build successful ✅
  - No TypeScript errors ✅
  - Dev server running on localhost:3000

### Technical Details

**Dependencies Installed:**
```json
{
  "gray-matter": "^4.0.3",
  "remark": "^15.0.1",
  "remark-html": "^16.0.1"
}
```

**Files Created:**
- `lib/types.ts` - TypeScript type definitions
- `lib/content.ts` - Content reading utilities
- `components/ui/Layout.tsx` - UI component barrel export

### Next Steps
1. Create content structure (markdown files)
2. Implement basic pages (Home, About, Contact)
3. Build Works system
4. Add SEO metadata

---

## Previous Session (2025-01-14) - Planning

### Completed Today
- ✅ Project planning
- ✅ Tech stack decisions
- ✅ Folder structure design

### Next Steps
1. Initialize Next.js project
2. Set up TypeScript configuration
```

---

## Session Workflow

### At Session Start

1. **Claude reads:**
   - `PLAN.md` - What's the roadmap?
   - `PROGRESS.md` - What was done last time?

2. **You specify:**
   - What to work on today
   - Any blockers or issues
   - Priority tasks

### During Session

**Claude should:**
- Create TodoList for multi-step tasks
- Update todos as work progresses
- Mark tasks complete immediately after finishing
- Test builds frequently
- Verify TypeScript has no errors

**You can:**
- Ask questions anytime
- Request explanations
- Change direction
- Request testing

### At Session End

**Claude updates `PROGRESS.md`:**
```markdown
## Latest Session (DATE) - FOCUS

### Completed Today
- ✅ Task 1 with details
- ✅ Task 2 with details

### Technical Details
**Files Created:**
- file1.ts - description
- file2.tsx - description

**Files Modified:**
- file3.tsx - what changed

### Next Steps
1. Next task
2. Another task
```

---

## Git Workflow

### Branching Strategy

```bash
main              # Production branch (deployed)
  ↓
development       # Working branch
```

### Commit Messages

**Format:**
```
type(scope): description

feat(works): add category filtering
fix(header): correct mobile menu behavior
design(about): update spacing and typography
content(works): add 5 new artworks
chore(deps): update Next.js to 14.2
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `design` - Visual/UI changes
- `content` - Content updates
- `refactor` - Code restructuring
- `chore` - Maintenance tasks
- `docs` - Documentation

### Deployment Workflow

**User says: "save and deploy"**

Claude executes:
```bash
git add .
git commit -m "descriptive message"
git push origin development
npx vercel --prod --yes
```

**Important:**
- Do NOT kill local dev server
- User stops dev server manually when needed
- Commit messages should be descriptive

---

## Testing Strategy

### During Development

**After every significant change:**
```bash
npm run build
```

**Check for:**
- Build completes successfully
- No TypeScript errors
- All pages generate correctly
- No console warnings

### Before Deployment

**Full checklist:**
```bash
npm run lint          # Lint check
npm run build         # Production build
```

**Manual checks:**
- All pages load correctly
- Images display properly
- Links work
- Mobile responsive
- Cross-browser compatible

### After Deployment

**Verify on production:**
- Site loads
- All routes work
- Images optimized
- No console errors

---

## Communication with Claude

### Effective Prompts

**✅ Good:**
```
"Create a Works page that displays all artworks in a 3-column grid.
Use the Grid and Card components from our UI system.
Fetch data using getWorksByCategorySlug from lib/content.ts"
```

**❌ Less effective:**
```
"Make a works page"
```

### When to Ask Questions

**Claude should ask when:**
- Requirements unclear
- Multiple valid approaches
- Trade-offs to consider
- Design decisions needed

**Example:**
```
"I can implement the gallery in two ways:
1. Lightbox modal (better UX, more code)
2. Simple links (simpler, less interactive)

Which approach do you prefer?"
```

---

## Directory of Common Tasks

### Add New Page

1. Create `app/[page-name]/page.tsx`
2. Create content file `content/pages/[page-name].md`
3. Add types to `lib/types.ts`
4. Add content utility to `lib/content.ts`
5. Update navigation in Header

### Add New Content Type

1. Define types in `lib/types.ts`
2. Create content utilities in `lib/content.ts`
3. Create markdown files in `content/`
4. Build components to display content
5. Create dynamic routes in `app/`

### Add UI Component

1. Define props interface in `components/ui/types.ts`
2. Create component in `components/ui/[ComponentName].tsx`
3. Export from `components/ui/Layout.tsx`
4. Use in pages

### Update Styles

1. Modify Tailwind classes in components
2. Update spacing system if needed
3. Test responsive behavior
4. Verify on multiple screen sizes

---

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
rm -rf .next
npm run build
```

### TypeScript Errors

```bash
# Regenerate Next.js types
npm run build
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Vercel Deployment Fails

1. Check build logs on Vercel dashboard
2. Verify environment variables set
3. Ensure all dependencies in package.json
4. Check Next.js version compatibility

---

## Best Practices Summary

### Code
- TypeScript strict mode, no `any`
- Functional components with typed props
- Named exports for components
- Default exports for pages
- Import aliases (`@/*`)

### Content
- All content in `content/` folder
- Markdown with frontmatter
- TypeScript types for all content
- Content utilities in `lib/content.ts`

### Components
- Reusable UI components in `components/ui/`
- Layout components in `components/layout/`
- Page-specific components in `components/[page]/`
- Barrel exports for easy imports

### Spacing
- No hardcoded spacing
- Use PageContainer, PageSection, Grid
- Consistent spacing scale
- Type-safe spacing props

### Git
- Descriptive commit messages
- Work on development branch
- Deploy from development
- Never commit node_modules or .env.local

---

**Next:** `06-PROGRESS-TRACKING.md` →
