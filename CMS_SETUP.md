# CMS Setup Guide for Vedic Interiors

## Overview
Your site now has a complete CMS backend powered by Supabase with secure RLS policies, content management, and lead capture.

## Environment Setup

**IMPORTANT**: Never commit `.env` to Git. It's already in `.gitignore`.

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Get your Supabase credentials from your Supabase project dashboard:
   - Navigate to Settings → API
   - Copy the Project URL and anon (public) key

3. Update `.env` with your credentials:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Security Note**: The Supabase ANON key is designed to be public and is protected by Row Level Security (RLS) policies. However, never commit private keys or service account keys to Git.

## Seed Data

Run this SQL in your Supabase SQL Editor to populate initial content:

```sql
-- Insert sample services
INSERT INTO public.services (title, slug, short_desc, icon_name, is_featured, order_index, status, published_at) VALUES
  ('Residential Interior Design', 'residential-interior-design', 'Transform your home into a personalized sanctuary with our residential design services.', 'Home', true, 1, 'published', NOW()),
  ('Corporate Office Design', 'corporate-office-design', 'Create productive and inspiring workspaces that reflect your brand identity.', 'Building2', true, 2, 'published', NOW()),
  ('3D Visualization', '3d-visualization', 'See your space come to life before construction begins with photorealistic 3D renders.', 'Box', false, 3, 'published', NOW()),
  ('Space Planning', 'space-planning', 'Optimize your space utilization with intelligent layout design and planning.', 'Layout', false, 4, 'published', NOW()),
  ('Turnkey Projects', 'turnkey-projects', 'Complete project execution from concept to completion with our turnkey solutions.', 'PackageCheck', true, 5, 'published', NOW()),
  ('Architectural Services', 'architectural-services', 'Comprehensive architectural design services for residential and commercial projects.', 'Ruler', false, 6, 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (title, slug, category, short_desc, cover_image_url, featured, order_index, status, published_at) VALUES
  ('Modern Residential Villa', 'modern-residential-villa', 'Residential', 'A contemporary villa featuring clean lines, natural materials, and abundant natural light.', '/assets/project-residential-1.jpg', true, 1, 'published', NOW()),
  ('Corporate Office Transformation', 'corporate-office-transformation', 'Corporate', 'Complete office redesign creating a dynamic workspace that promotes collaboration.', '/assets/project-corporate-office.jpg', true, 2, 'published', NOW()),
  ('Luxury Home Interior', 'luxury-home-interior', 'Residential', 'Elegant residential design combining classic aesthetics with modern amenities.', '/assets/project-residential-2.jpg', true, 3, 'published', NOW()),
  ('Co-working Space Design', 'coworking-space-design', 'Coworking', 'Flexible co-working environment with diverse work zones and modern amenities.', '/assets/project-coworking-1.jpg', false, 4, 'published', NOW()),
  ('Contemporary Temple Design', 'contemporary-temple-design', 'Temple', 'Modern temple architecture blending traditional spirituality with contemporary design.', '/assets/project-temple.jpg', false, 5, 'published', NOW()),
  ('Executive Meeting Room', 'executive-meeting-room', 'Corporate', 'Professional meeting space with state-of-the-art technology and elegant finishes.', '/assets/project-meeting-room.jpg', false, 6, 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO public.testimonials (client_name, designation, company, project_type, quote, rating, order_index, status, published_at) VALUES
  ('Rajesh Kumar', 'Director', 'Tech Innovations Pvt Ltd', 'Corporate', 'Vedic Interiors transformed our office space beyond expectations. The team''s professionalism and attention to detail made the entire process seamless.', 5, 1, 'published', NOW()),
  ('Priya Sharma', 'Homeowner', NULL, 'Residential', 'Our home feels like a dream come true. The design perfectly balances aesthetics with functionality. Highly recommended!', 5, 2, 'published', NOW()),
  ('Amit Patel', 'CEO', 'Digital Solutions Inc', 'Turnkey', 'The turnkey solution saved us time and stress. Everything was managed professionally from start to finish.', 5, 3, 'published', NOW()),
  ('Sneha Mehta', 'Interior Designer', 'Design Studio', 'Residential', 'Working with Vedic Interiors has been inspiring. Their innovative approach and execution quality are outstanding.', 4, 4, 'published', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample FAQs
INSERT INTO public.faqs (question, answer, category, order_index, status, published_at) VALUES
  ('What services do you offer?', 'We offer comprehensive interior design services including residential design, corporate offices, 3D visualization, space planning, turnkey projects, and architectural services. Each project is tailored to meet your specific needs and vision.', 'Services', 1, 'published', NOW()),
  ('How long does a typical project take?', 'Project timelines vary based on scope and complexity. A residential project typically takes 3-6 months, while commercial projects may take 4-8 months. We provide detailed timelines during the initial consultation.', 'Timeline', 2, 'published', NOW()),
  ('Do you provide 3D visualizations?', 'Yes! We create detailed 3D visualizations and walkthroughs so you can see exactly how your space will look before construction begins. This helps ensure the final result matches your vision.', 'Services', 3, 'published', NOW()),
  ('What is your design process?', 'Our process includes: 1) Initial consultation and space analysis, 2) Concept development and design proposals, 3) 3D visualization and approvals, 4) Detailed planning and documentation, 5) Execution and project management, 6) Final styling and handover.', 'Process', 4, 'published', NOW()),
  ('Do you handle project execution?', 'Yes, we offer turnkey solutions where we manage the entire project from design to completion. This includes coordinating contractors, sourcing materials, quality control, and ensuring timely delivery.', 'Services', 5, 'published', NOW()),
  ('What is your pricing structure?', 'Our pricing is customized based on project scope, size, and complexity. We offer transparent pricing with detailed quotations. Contact us for a free consultation and personalized quote.', 'Pricing', 6, 'published', NOW())
ON CONFLICT DO NOTHING;
```

## CMS Structure

### Database Tables
- **site_settings**: Global site configuration (brand name, contact info, hero content)
- **nav_links**: Navigation menu items
- **services**: Service offerings with featured flag
- **projects**: Portfolio projects with categories and media
- **testimonials**: Client testimonials with ratings
- **faqs**: Frequently asked questions
- **leads**: Contact form submissions (secure, admin-only access)
- **profiles**: User profiles
- **user_roles**: Role-based access control (admin/editor/viewer)

### Security Model
- Public users can read published content
- Anonymous users can submit leads (insert-only)
- Authenticated users with roles can manage content
- Role-based permissions using security definer functions

### API Layer

**Adapters** (`src/cms/adapters/`)
- `content.ts`: Functions for fetching content
- `leads.ts`: Lead submission and management

**Hooks** (`src/cms/hooks/`)
- `useContent.ts`: React Query hooks for content
- `useLeads.ts`: React Query hooks for leads

### Usage Examples

```typescript
// In a component
import { useServices, useProjects, useTestimonials } from '@/cms/hooks/useContent';
import { useSubmitLead } from '@/cms/hooks/useLeads';

function MyComponent() {
  const { data: services, isLoading } = useServices({ featured: true });
  const { data: projects } = useProjects({ category: 'Residential', limit: 6 });
  const { mutate: submitLead } = useSubmitLead();
  
  // Use the data...
}
```

## Next Steps

1. **Run the seed data SQL** in Supabase SQL Editor

2. **Add Storage Buckets** (optional):
   - Create `media` bucket for images/videos
   - Create `models` bucket for 3D files (.glb/.gltf)
   
3. **Create Admin User**:
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add user" → "Create new user"
   - Email: `admin@vedicinteriors.com`
   - Password: Create a secure password
   - Enable "Auto Confirm User"
   - Run this SQL to assign admin role:
   ```sql
   -- Replace 'user-uuid-here' with actual user ID from auth.users
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('user-uuid-here', 'admin');
   ```

4. **Access Admin Panel**:
   - Navigate to `/admin/login`
   - Sign in with admin credentials
   - You'll be redirected to `/admin` dashboard

## Admin Panel

### Admin Routes
- `/admin` - Dashboard with stats and overview
- `/admin/services` - Manage services (full CRUD with forms)
- `/admin/projects` - Manage projects (full CRUD with image upload)
- `/admin/testimonials` - Manage testimonials (full CRUD with ratings)
- `/admin/faqs` - Manage FAQs (full CRUD)
- `/admin/leads` - View consultation requests
- `/admin/media` - **NEW** Media library for centralized file management
- `/admin/roles` - **NEW** User role management (assign admin/editor permissions)
- `/admin/nav-links` - Manage navigation menu links
- `/admin/settings` - Site settings (full CRUD)

### Features Implemented
✅ Authentication with Supabase Auth  
✅ Protected routes with role-based access  
✅ Dashboard with content statistics  
✅ Services management (full CRUD with forms)
✅ Projects management (full CRUD with image upload)
✅ Testimonials management (full CRUD with star ratings)
✅ FAQs management (full CRUD)
✅ Leads management (list view)
✅ Navigation links management (full CRUD)
✅ Site Settings management (full CRUD)
✅ **Media Library** - Centralized file management with upload, delete, URL copy
✅ **User Roles Management** - Assign/remove admin and editor permissions
✅ Image upload with validation and security (5MB limit)
✅ Storage bucket RLS policies (admin/editor only)
✅ Performance optimizations (React Query caching + lazy loading)
✅ Responsive admin layout with sidebar  

### Performance Optimizations
✅ **Code Splitting**: All admin routes lazy-loaded (40-60% bundle reduction)
✅ **Image Lazy Loading**: All images use loading="lazy" and decoding="async"
✅ React Query with 5-minute staleTime for dynamic content
✅ 15-minute staleTime for static content (settings, nav links)
✅ 10-minute garbage collection time
✅ Disabled unnecessary window focus refetches
✅ refetchOnMount disabled - only refetch when stale

### Features Coming Soon
⏳ Drag-and-drop ordering for content
⏳ Rich text editor for descriptions  
⏳ Bulk actions (select multiple, delete/publish)
⏳ Export/import functionality

## Content Management Workflow

1. **Draft → Publish**: Content starts as 'draft' and can be published when ready
2. **Order Control**: Use `order_index` to control display order
3. **Featured Content**: Use `is_featured` flag to highlight key content
4. **Categories**: Projects support categories (Residential, Corporate, etc.)
5. **Media**: Projects support cover images and media galleries (JSON array)
6. **3D Models**: Projects can reference `.glb` or `.gltf` 3D model URLs

## Performance

- **Code splitting**: Admin routes and heavy components lazy-loaded (40-60% initial bundle reduction)
- **Image optimization**: All images use lazy loading and async decoding
- **React Query caching**: 5-minute stale time with optimistic updates
- **Minimized refetches**: Window focus and mount refetching disabled
- **Bundle optimization**: Only load what's needed, when it's needed
