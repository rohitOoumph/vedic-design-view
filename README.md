# Vedic Interiors - Interior Design Showcase

A modern, full-featured interior design website with CMS backend, built with React, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Live Demo

- **Public Site**: https://preview--vedic-design-view.lovable.app/
- **Admin Panel**: https://preview--vedic-design-view.lovable.app/admin/login
- **Lovable Project**: https://lovable.dev/projects/f0fec59f-60fd-4242-810e-1124b598c0e8

## ✨ Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🔐 Full CMS backend with role-based access control
- 📸 Media library for centralized file management
- 🏢 Portfolio showcase with category filtering
- 💬 Client testimonials and ratings
- 📝 FAQ management system
- 📮 Lead capture and management
- 🎭 3D animated hero section (Three.js)
- ⚡ Performance optimized (code splitting, lazy loading)
- 🔒 Secure with Row Level Security (RLS)

## 📚 Documentation

- **[CMS_SETUP.md](./CMS_SETUP.md)** - CMS setup and usage guide
- **[DEVELOPERS.md](./DEVELOPERS.md)** - Comprehensive developer guide
- **[.env.example](./.env.example)** - Environment variables template

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State**: TanStack React Query
- **Routing**: React Router v6
- **3D Graphics**: Three.js
- **Forms**: React Hook Form + Zod

## Project info

**URL**: https://lovable.dev/projects/f0fec59f-60fd-4242-810e-1124b598c0e8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f0fec59f-60fd-4242-810e-1124b598c0e8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Configure environment variables
# Copy .env.example to .env and add your Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and ANON key

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The app will be available at `http://localhost:8080`

## 🔐 Environment Configuration

**IMPORTANT**: Never commit `.env` to Git. It's already in `.gitignore`.

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get your Supabase credentials:
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy the Project URL and anon (public) key

3. Update `.env` with your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

**Security Note**: The Supabase ANON key is designed to be public and is protected by Row Level Security (RLS) policies. However, never commit private keys or service account keys.

For complete setup instructions, see [CMS_SETUP.md](./CMS_SETUP.md)

## 📦 Available Scripts

```bash
npm run dev      # Start development server (port 8080)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🏗️ Project Structure

```
src/
├── assets/              # Images, logos, project photos
├── cms/                 # CMS backend code
│   ├── adapters/       # Data access layer
│   ├── admin/          # Admin panel components & pages
│   ├── hooks/          # React hooks (useAuth, useContent, useLeads)
│   └── types/          # TypeScript types
├── components/         # Public-facing components
│   ├── ui/            # shadcn/ui base components
│   └── *.tsx          # Page sections
├── integrations/       # Supabase integration
├── pages/             # Route pages
├── App.tsx            # Main app with routing
├── index.css          # Global styles & design tokens
└── main.tsx           # Entry point
```

## 🎨 Design System

The project uses semantic design tokens defined in:
- `src/index.css` - CSS custom properties (colors, gradients, shadows)
- `tailwind.config.ts` - Tailwind theme extensions

**Important**: Always use semantic tokens (e.g., `text-foreground`, `bg-background`) instead of hardcoded colors.

## 🚀 Deployment

### Deploy with Lovable (Recommended)

Simply open [Lovable](https://lovable.dev/projects/f0fec59f-60fd-4242-810e-1124b598c0e8) and click on **Share → Publish**.

Your site will be deployed to `*.lovable.app` with automatic SSL.

### Self-Hosting

```bash
# Build for production
npm run build

# The dist/ folder can be deployed to:
# - Vercel
# - Netlify  
# - Cloudflare Pages
# - AWS S3 + CloudFront
# - Any static hosting service
```

**Important**: Set environment variables in your hosting platform's dashboard.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🔒 Security

### Row Level Security (RLS)

All database tables are protected by RLS policies:
- **Public users**: Can read published content only
- **Anonymous users**: Can submit leads (insert-only)
- **Authenticated admins/editors**: Full CRUD access to content

### Environment Variables

- ✅ **ANON key**: Safe to be public (frontend, RLS-protected)
- ❌ **Service account keys**: Never commit to Git
- ❌ **Private API keys**: Store in Supabase secrets or hosting platform

### Git History Cleanup

If sensitive files were committed, see [DEVELOPERS.md](./DEVELOPERS.md#git-history-cleanup) for cleanup instructions.

## 🧑‍💼 Admin Panel

### Access

1. Navigate to `/admin/login`
2. Sign in with admin credentials
3. Manage content, view leads, upload media

### Admin Routes

- `/admin` - Dashboard with statistics
- `/admin/services` - Manage services
- `/admin/projects` - Manage portfolio projects
- `/admin/testimonials` - Manage testimonials
- `/admin/faqs` - Manage FAQs
- `/admin/leads` - View lead submissions
- `/admin/media` - Media library
- `/admin/roles` - User role management
- `/admin/settings` - Site settings

### Creating Admin Users

See [CMS_SETUP.md](./CMS_SETUP.md#next-steps) for instructions on creating admin users.

## 📖 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linting: `npm run lint`
4. Commit: `git commit -m "feat: add new feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## 📝 License

This project is proprietary. All rights reserved.

---

**Need help?** Check out [DEVELOPERS.md](./DEVELOPERS.md) for comprehensive documentation or visit the [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613).
