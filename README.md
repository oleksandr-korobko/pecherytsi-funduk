# YVK Web Development Methodology

> **Template for building production-ready Next.js projects with Claude Code**

This folder contains the complete methodology used to build the Yuliia Holovatiuk-Ungureanu artist portfolio. Use this as a template for your next project.

---

## 📁 What's Inside

| File | Purpose |
|------|---------|
| `01-PROJECT-SETUP.md` | Initial setup, stack choices, and configuration |
| `02-ARCHITECTURE.md` | Project structure, folders, and organization |
| `03-CONTENT-SYSTEM.md` | Content management, markdown, and TypeScript types |
| `04-UI-COMPONENTS.md` | Component architecture and reusable UI patterns |
| `05-WORKFLOW.md` | Development workflow and Claude Code instructions |
| `06-PROGRESS-TRACKING.md` | How to track progress and plan implementation |
| `07-DEPLOYMENT.md` | Deployment workflow and Vercel setup |

---

## 🎯 Core Philosophy

### 1. **Zero Hard-Coding**
- Content lives in markdown files with frontmatter
- Configuration in dedicated files (types.ts, categories.ts, site-config.md)
- Never hardcode text, images, or data in components
- Components receive data via props from content utilities

### 2. **Type-Safe Everything**
- TypeScript strict mode always
- No `any` types
- Interfaces for all content structures
- Type guards for runtime validation

### 3. **Simple Before Complex**
- Start with simple solutions
- Refactor only when necessary
- Avoid over-engineering
- Build features iteratively

### 4. **Content Separation**
- Content in `content/` folder
- Images in `public/images/`
- Components never contain content
- Easy to update without touching code

### 5. **Systematic Spacing & Design**
- Reusable UI components (PageContainer, PageSection, Grid, Card)
- Consistent spacing scale defined once
- Type-safe props prevent spacing mistakes
- Easy to maintain and adjust globally

---

## 🚀 Quick Start

1. **Read** `01-PROJECT-SETUP.md` - Set up your stack
2. **Study** `02-ARCHITECTURE.md` - Understand the structure
3. **Implement** `03-CONTENT-SYSTEM.md` - Build content layer
4. **Build** `04-UI-COMPONENTS.md` - Create reusable components
5. **Follow** `05-WORKFLOW.md` - Use Claude Code effectively
6. **Track** `06-PROGRESS-TRACKING.md` - Document your progress
7. **Deploy** `07-DEPLOYMENT.md` - Ship to production

---

## 💡 Key Principles

### Content-First Approach
```typescript
// ❌ BAD - Hardcoded content
export function Hero() {
  return <h1>Welcome to my portfolio</h1>;
}

// ✅ GOOD - Content from markdown
export function Hero({ content }: { content: HomePageContent }) {
  return <h1>{content.title}</h1>;
}
```

### Type-Safe Content
```typescript
// Define types for all content structures
export interface HomePageContent {
  title: string;
  heroImage: string;
  content: string;
}

// Utility to read content with types
export function getHomePageContent(): HomePageContent {
  const { data, content } = readMarkdownFile<Omit<HomePageContent, 'content'>>('pages/home.md');
  return { ...data, content };
}
```

### Systematic UI Components
```typescript
// Reusable container with type-safe props
<PageContainer maxWidth="narrow">
  <PageSection spacing="lg">
    <Grid columns={3} gap="md">
      <Card image="..." title="..." />
    </Grid>
  </PageSection>
</PageContainer>
```

---

## 📊 Project Statistics (Reference)

**Yuliia Art Portfolio:**
- 27 artworks across 5 categories
- 152 high-quality images
- 41 static pages generated
- Build time: ~26s
- TypeScript strict mode: 0 errors
- Lighthouse scores: 96+ across all metrics

---

## 🔄 Workflow Summary

### Before Every Task
1. Read `PLAN.md` - understand the roadmap
2. Read `PROGRESS.md` - see what was done last session
3. Then proceed with implementation

### After Every Task
1. Update `PROGRESS.md` with what was completed
2. Update "Next Steps" section
3. Update timestamp

### Deployment
```bash
git add .
git commit -m "descriptive message"
git push origin development
npx vercel --prod --yes
```

---

## 🎨 Design Principles

1. **Minimalism** - Maximum whitespace, minimal UI
2. **Image-First** - Visual content is the hero
3. **Clean Typography** - Readable fonts, generous spacing
4. **Mobile-First** - Responsive from the ground up
5. **Type-Safe** - TypeScript prevents mistakes

---

## 📝 Notes for New Projects

### Adapt, Don't Copy
- Use this as a **guide**, not a strict template
- Every project has unique requirements
- Adjust the methodology to your needs
- Start simple, add complexity when needed

### Content Types
For different project types:
- **Blog:** Posts instead of Works
- **E-commerce:** Products with categories
- **Corporate:** Services/Team/Projects
- **Portfolio:** Projects/Case Studies

The **same principles apply**:
- Content in markdown
- TypeScript types
- Reusable components
- Zero hardcoding

---

## 🛠 Tech Stack (Reference)

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Content | Markdown + gray-matter |
| Hosting | Vercel |
| Images | Next.js Image optimization |

---

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)

---

## 🎯 Success Checklist

- [ ] Project structure follows `02-ARCHITECTURE.md`
- [ ] Content system implemented per `03-CONTENT-SYSTEM.md`
- [ ] UI components follow `04-UI-COMPONENTS.md` patterns
- [ ] Workflow documented in `CLAUDE.md`
- [ ] Progress tracked in `PROGRESS.md`
- [ ] Plan documented in `PLAN.md`
- [ ] TypeScript strict mode with 0 errors
- [ ] Build successful
- [ ] Deployed to production

---

**Ready to start?** Begin with `01-PROJECT-SETUP.md` →
