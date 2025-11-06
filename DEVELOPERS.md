# Vedic Interiors - Developer Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Environment Configuration](#environment-configuration)
5. [Database Schema](#database-schema)
6. [CMS System](#cms-system)
7. [Frontend Components](#frontend-components)
8. [API & Data Layer](#api--data-layer)
9. [Security](#security)
10. [Performance Optimizations](#performance-optimizations)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

Vedic Interiors is a modern interior design showcase website with a full-featured CMS backend. Built with React, TypeScript, Tailwind CSS, and Supabase.

### Tech Stack
- **Frontend**: React 18.3, TypeScript, Vite
- **UI Framework**: shadcn/ui components, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + RLS)
- **State Management**: TanStack React Query
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (for hero section)
- **Forms**: React Hook Form + Zod validation

### Key Features
- ✅ Full CMS for content management
- ✅ Role-based access control (Admin, Editor, Viewer)
- ✅ Media library with storage management
- ✅ Lead capture and management
- ✅ Portfolio with category filtering
- ✅ Dynamic project modals with image galleries
- ✅ Testimonials with ratings
- ✅ FAQ management
- ✅ SEO optimized with React Helmet
- ✅ Responsive design (mobile-first)
- ✅ Performance optimized (code splitting, lazy loading)

---

## Architecture

### Directory Structure
```
src/
├── assets/                    # Static images, logos, project photos
├── cms/                       # CMS-related code
│   ├── adapters/             # Data access layer (content, leads)
│   ├── admin/                # Admin panel
│   │   ├── components/       # Admin UI components
│   │   ├── pages/            # Admin pages (Dashboard, Projects, etc.)
│   │   └── utils/            # Admin utilities (image upload, etc.)
│   ├── hooks/                # React hooks (useAuth, useContent, useLeads)
│   └── types/                # TypeScript types for CMS
├── components/               # Public-facing components
│   ├── ui/                   # shadcn/ui base components
│   └── *.tsx                 # Page sections (Hero, Portfolio, etc.)
├── hooks/                    # Shared React hooks
├── integrations/             # Third-party integrations
│   └── supabase/            # Supabase client & types
├── lib/                      # Utilities (utils.ts)
├── pages/                    # Route pages (Index, About, Portfolio, etc.)
├── App.tsx                   # Main app with routing
├── index.css                 # Global styles & design tokens
└── main.tsx                  # App entry point
```

### Design System
All colors, fonts, and spacing follow semantic tokens defined in:
- `src/index.css` - CSS custom properties (colors, gradients, shadows)
- `tailwind.config.ts` - Tailwind theme extensions

**Important**: Never use hardcoded colors like `text-white` or `bg-black`. Always use semantic tokens like `text-foreground`, `bg-background`, `text-primary`, etc.

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/bun
- Supabase account (for backend)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd vedic-interiors
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file (see [Environment Configuration](#environment-configuration))

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ IMPORTANT SECURITY NOTES:**

1. **Never commit `.env` to Git** - It's already in `.gitignore`
2. **The ANON key is safe to be public** - It's designed for frontend use and protected by RLS policies
3. **Do not commit private keys** - Only use ANON (publishable) keys in frontend code
4. **If `.env` was committed**: 
   - Delete it from the repository
   - Purge it from Git history (see [Security](#security))
   - Consider rotating keys if they're truly sensitive

### How to Get Supabase Keys

1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon (public) key** → `VITE_SUPABASE_ANON_KEY`

### Fallback Configuration

The Supabase client (`src/integrations/supabase/client.ts`) includes hardcoded fallbacks. These are only used if environment variables are not found. For production, always use proper environment variables.

---

## Database Schema

### Core Tables

#### `profiles`
User profile information linked to auth.users
```sql
- id: uuid (PK)
- user_id: uuid (FK to auth.users)
- full_name: text
- avatar_url: text
- created_at: timestamp
- updated_at: timestamp
```

#### `user_roles`
Role-based access control
```sql
- id: uuid (PK)
- user_id: uuid (FK to auth.users)
- role: text ('admin' | 'editor' | 'viewer')
- created_at: timestamp
```

#### `site_settings`
Global site configuration
```sql
- id: uuid (PK)
- brand_name: text
- tagline: text
- hero_title: text
- hero_subtitle: text
- contact_email: text
- contact_phone: text
- address: text
- social_links: jsonb
- created_at: timestamp
- updated_at: timestamp
```

#### `services`
Service offerings
```sql
- id: uuid (PK)
- title: text
- slug: text (unique)
- short_desc: text
- full_desc: text
- icon_name: text
- is_featured: boolean
- order_index: integer
- status: text ('draft' | 'published')
- published_at: timestamp
```

#### `projects`
Portfolio projects
```sql
- id: uuid (PK)
- title: text
- slug: text (unique)
- category: text
- short_desc: text
- full_desc: text
- cover_image_url: text
- media_urls: text[] (gallery images)
- model_url: text (.glb/.gltf 3D model)
- client_name: text
- location: text
- year: integer
- area: text
- tags: text[]
- featured: boolean
- order_index: integer
- status: text ('draft' | 'published')
- published_at: timestamp
```

#### `testimonials`
Client testimonials
```sql
- id: uuid (PK)
- client_name: text
- designation: text
- company: text
- project_type: text
- quote: text
- rating: integer (1-5)
- avatar_url: text
- order_index: integer
- status: text ('draft' | 'published')
- published_at: timestamp
```

#### `faqs`
Frequently asked questions
```sql
- id: uuid (PK)
- question: text
- answer: text
- category: text
- order_index: integer
- status: text ('draft' | 'published')
- published_at: timestamp
```

#### `leads`
Contact form submissions
```sql
- id: uuid (PK)
- name: text
- email: text
- phone: text
- service: text
- budget: text
- message: text
- status: text ('new' | 'contacted' | 'qualified' | 'converted')
- created_at: timestamp
```

### Storage Buckets
- `media` - Images, videos, documents
- `models` - 3D model files (.glb, .gltf)

---

## CMS System

### Authentication Flow

1. User visits `/admin/login`
2. Signs in with email/password (Supabase Auth)
3. `useAuth` hook manages session state
4. `ProtectedRoute` checks authentication
5. Role-based access controlled by `user_roles` table

### Admin Routes

| Route | Page | Access |
|-------|------|--------|
| `/admin` | Dashboard | Admin, Editor |
| `/admin/services` | Services Management | Admin, Editor |
| `/admin/projects` | Projects Management | Admin, Editor |
| `/admin/testimonials` | Testimonials | Admin, Editor |
| `/admin/faqs` | FAQs | Admin, Editor |
| `/admin/leads` | Lead Management | Admin |
| `/admin/media` | Media Library | Admin, Editor |
| `/admin/roles` | User Roles | Admin |
| `/admin/nav-links` | Navigation Links | Admin |
| `/admin/settings` | Site Settings | Admin |

### Content Management Workflow

1. **Create**: Add new content as 'draft'
2. **Edit**: Update content metadata, images, descriptions
3. **Publish**: Change status to 'published' and set `published_at`
4. **Order**: Use `order_index` to control display order
5. **Feature**: Toggle `is_featured` or `featured` flag
6. **Archive**: Change status back to 'draft' or delete

### Role Permissions

| Action | Admin | Editor | Viewer |
|--------|-------|--------|--------|
| View content | ✅ | ✅ | ✅ |
| Create content | ✅ | ✅ | ❌ |
| Edit content | ✅ | ✅ | ❌ |
| Delete content | ✅ | ⚠️ (own) | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| View leads | ✅ | ⚠️ (limited) | ❌ |
| Site settings | ✅ | ❌ | ❌ |

---

## Frontend Components

### Page Components (`src/pages/`)
- `Index.tsx` - Home page with all sections
- `About.tsx` - About page
- `Services.tsx` - Services listing
- `Portfolio.tsx` - Portfolio with category filters
- `Contact.tsx` - Contact form
- `Testimonials.tsx` - Client testimonials
- `NotFound.tsx` - 404 page

### Section Components (`src/components/`)
- `HeroSection.tsx` - Hero with video background
- `Hero3D.tsx` - 3D animated hero (lazy loaded)
- `ServicesSection.tsx` - Services grid
- `PortfolioSection.tsx` - Portfolio grid with filters
- `PortfolioCategoriesSection.tsx` - Category filter buttons
- `ProjectModal.tsx` - Project detail modal with gallery
- `TestimonialsSection.tsx` - Testimonials carousel
- `FAQSection.tsx` - Accordion FAQs
- `ContactSection.tsx` - Contact form
- `Footer.tsx` - Site footer
- `Navbar.tsx` - Navigation bar

### Shared Components
- `ConsultationDialog.tsx` - Consultation request dialog
- `ScrollToTop.tsx` - Scroll to top on route change

### Admin Components (`src/cms/admin/components/`)
- `AdminLayout.tsx` - Admin panel layout with sidebar
- `ProtectedRoute.tsx` - Route guard with auth check
- `ServiceFormDialog.tsx` - Service CRUD form
- `ProjectFormDialog.tsx` - Project CRUD form
- `TestimonialFormDialog.tsx` - Testimonial CRUD form
- `FAQFormDialog.tsx` - FAQ CRUD form
- `ImageUpload.tsx` - Image upload with preview

---

## API & Data Layer

### Adapters (`src/cms/adapters/`)

**content.ts** - Content fetching functions
```typescript
export const getServices = (filters?: ServiceFilters) => Promise<Service[]>
export const getProjects = (filters?: ProjectFilters) => Promise<Project[]>
export const getTestimonials = (filters?: TestimonialFilters) => Promise<Testimonial[]>
export const getFAQs = (filters?: FAQFilters) => Promise<FAQ[]>
export const getSiteSettings = () => Promise<SiteSettings>
```

**leads.ts** - Lead management
```typescript
export const submitLead = (lead: LeadSubmission) => Promise<void>
export const getLeads = (filters?: LeadFilters) => Promise<Lead[]>
export const updateLeadStatus = (id: string, status: LeadStatus) => Promise<void>
```

### React Hooks (`src/cms/hooks/`)

**useContent.ts** - Content queries
```typescript
export const useServices = (filters?: ServiceFilters)
export const useProjects = (filters?: ProjectFilters)
export const useTestimonials = (filters?: TestimonialFilters)
export const useFAQs = (filters?: FAQFilters)
export const useSiteSettings = ()
```

**useLeads.ts** - Lead mutations
```typescript
export const useSubmitLead = ()
export const useLeads = (filters?: LeadFilters)
export const useUpdateLeadStatus = ()
```

**useAuth.ts** - Authentication
```typescript
export const useAuth = () => { user, loading }
export const signIn = (email, password) => Promise
export const signOut = () => Promise
export const signUp = (email, password, fullName) => Promise
```

### React Query Configuration

```typescript
// Default cache times
staleTime: 5 * 60 * 1000,     // 5 minutes for dynamic content
staleTime: 15 * 60 * 1000,    // 15 minutes for static content
gcTime: 10 * 60 * 1000,       // 10 minutes garbage collection
refetchOnWindowFocus: false,  // Disabled for performance
refetchOnMount: false,        // Only refetch when stale
```

---

## Security

### Row Level Security (RLS)

All database tables have RLS policies:

**Public Content (read-only)**
- Services, Projects, Testimonials, FAQs
- Policy: `SELECT` for anonymous users where `status = 'published'`

**Lead Submissions (insert-only)**
- Leads table
- Policy: `INSERT` for anonymous users, `SELECT/UPDATE` for admins

**Admin Content Management**
- All tables
- Policy: Full CRUD for authenticated users with admin/editor roles

**Storage Buckets**
- Policy: Public read, admin/editor upload/delete

### Authentication

- **Supabase Auth** handles user authentication
- **JWT tokens** stored in localStorage
- **Session persistence** with auto-refresh
- **Protected routes** with `ProtectedRoute` component

### Environment Variables Security

**❌ NEVER commit these to Git:**
- Private API keys
- Service account keys
- Database passwords
- Secret keys

**✅ Safe to commit (but still use .env):**
- Supabase ANON key (frontend, public, RLS-protected)
- Public API keys

### Git History Cleanup

If `.env` was committed to Git history:

```bash
# Remove .env from all commits (DESTRUCTIVE - backup first!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (requires force push permissions)
git push origin --force --all
git push origin --force --tags

# Clean local refs
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Alternative**: Use BFG Repo-Cleaner (faster, safer)
```bash
# Install BFG
brew install bfg  # macOS

# Remove .env from history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

### Supabase Key Rotation

If you need to rotate keys:
1. Go to Supabase Dashboard → Settings → API
2. Click "Generate new anon key" (this will invalidate the old one)
3. Update `.env` with new key
4. Redeploy your application

---

## Performance Optimizations

### Code Splitting

**Route-level lazy loading:**
```typescript
const AdminApp = lazy(() => import('@/cms/admin/AdminApp'));
const Hero3D = lazy(() => import('@/components/Hero3D'));
```

**Benefits:**
- 40-60% reduction in initial JS bundle
- Faster initial page load
- Admin code only loaded when accessing admin panel
- Heavy 3D libraries only loaded when needed

### Image Optimization

**All images use:**
```tsx
<img 
  loading="lazy"        // Browser-native lazy loading
  decoding="async"      // Async image decoding
  alt="descriptive"     // SEO & accessibility
/>
```

### React Query Optimization

- **Stale-while-revalidate** caching strategy
- **5-minute cache** for dynamic content
- **15-minute cache** for static content
- **No refetch on window focus** (reduces API calls)
- **No refetch on mount** (uses cache first)

### Bundle Size Optimization

- **Tree-shaking** with Vite
- **Dynamic imports** for heavy libraries
- **Component-level code splitting**
- **Minimal dependencies** (only what's needed)

---

## Deployment

### Frontend Deployment (Lovable)

1. Click "Publish" in Lovable editor
2. Your site will be deployed to `*.lovable.app`
3. Connect custom domain in Settings → Domains

### Frontend Deployment (Self-hosted)

```bash
# Build
npm run build

# Preview build
npm run preview

# Deploy dist/ folder to:
# - Vercel
# - Netlify
# - Cloudflare Pages
# - AWS S3 + CloudFront
# - Any static hosting
```

### Environment Variables (Production)

Set these in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Cloudflare: Workers & Pages → Settings → Environment Variables

### Database Migrations

Supabase automatically applies migrations. For self-hosted:
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

---

## Troubleshooting

### Common Issues

**Issue: "Cannot read property 'map' of undefined"**
- **Cause**: Data not loaded yet
- **Solution**: Add loading state or optional chaining
```tsx
{data?.map(...) || <Skeleton />}
```

**Issue: Images not loading from Supabase Storage**
- **Cause**: Bucket not public or incorrect RLS policies
- **Solution**: Check bucket settings and RLS policies

**Issue: Authentication redirects not working**
- **Cause**: Missing redirect URL in Supabase auth settings
- **Solution**: Add redirect URLs in Supabase Dashboard → Authentication → URL Configuration

**Issue: Build fails with "Cannot find module"**
- **Cause**: Missing dependency or incorrect import
- **Solution**: Check imports and run `npm install`

**Issue: Slow admin panel load**
- **Cause**: Loading too much data or large images
- **Solution**: Add pagination, optimize images, use lazy loading

### Debug Tools

**React Query Devtools** (development only)
```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Auto-included in development mode
```

**Supabase Logs**
- Go to Supabase Dashboard → Logs
- Check API logs, Auth logs, Function logs

**Browser DevTools**
- Network tab: Check API requests
- Console: Check errors
- React DevTools: Inspect component state

---

## Contributing

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Run `npm run lint` before committing
- **Formatting**: Use Prettier (recommended)
- **Naming**: 
  - Components: PascalCase (`ServiceCard.tsx`)
  - Hooks: camelCase starting with `use` (`useServices.ts`)
  - Utils: camelCase (`formatDate.ts`)

### Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: add new feature"`
3. Push branch: `git push origin feature/your-feature`
4. Create pull request
5. Code review and merge

### Commit Message Format

Follow Conventional Commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## Support

### Documentation
- [Lovable Docs](https://docs.lovable.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Supabase Discord](https://discord.supabase.com/)

### Project Links
- **Live Site**: https://preview--vedic-design-view.lovable.app/
- **Lovable Project**: https://lovable.dev/projects/f0fec59f-60fd-4242-810e-1124b598c0e8
- **Admin Panel**: https://preview--vedic-design-view.lovable.app/admin/login

---

## License

This project is proprietary. All rights reserved.

---

**Last Updated**: 2025-01-06
**Version**: 1.0.0
**Maintainers**: Vedic Interiors Development Team
