# Security Guidelines - Vedic Interiors

## Overview

This document outlines security best practices, policies, and procedures for the Vedic Interiors project.

---

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Git Security](#git-security)
3. [Database Security](#database-security)
4. [Authentication](#authentication)
5. [Authorization](#authorization)
6. [API Security](#api-security)
7. [Frontend Security](#frontend-security)
8. [Incident Response](#incident-response)

---

## Environment Variables

### What Should NEVER Be Committed

❌ **NEVER commit these to Git:**
- Service account keys (Supabase service role key)
- Private API keys (payment processors, email services, etc.)
- Database passwords
- Secret tokens or encryption keys
- Any credentials with write/admin permissions

### What CAN Be Public (But Still Use .env)

✅ **Safe to expose (still use .env for consistency):**
- Supabase ANON key (frontend, public, RLS-protected)
- Public API keys (analytics, maps, etc.)
- Project IDs and URLs

### .env File Management

**Always:**
1. Use `.env.example` as a template (commit this)
2. Add `.env` to `.gitignore` (already done)
3. Document required variables in `.env.example`
4. Never commit `.env` to Git

**Example .env.example:**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# DO NOT commit actual values to Git!
```

---

## Git Security

### Remove Committed Secrets

If `.env` or secrets were committed to Git:

#### Option 1: BFG Repo-Cleaner (Recommended)

```bash
# Install BFG (macOS)
brew install bfg

# Backup your repo first!
git clone --mirror <repo-url> backup-repo.git

# Remove .env from history
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (destructive - coordinate with team!)
git push origin --force --all
git push origin --force --tags
```

#### Option 2: git filter-branch

```bash
# Remove .env from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
git push origin --force --tags

# Clean local refs
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

#### After Cleanup

1. **Notify all team members** to re-clone the repository
2. **Rotate all exposed credentials**
3. **Review Supabase logs** for unauthorized access
4. **Update environment variables** in all deployment environments

### Pre-commit Hooks

Consider using git-secrets or similar tools:

```bash
# Install git-secrets
brew install git-secrets  # macOS

# Set up in repository
git secrets --install
git secrets --register-aws  # or custom patterns

# Add custom patterns
git secrets --add 'VITE_SUPABASE_URL=.*'
git secrets --add 'VITE_SUPABASE_ANON_KEY=.*'
```

---

## Database Security

### Row Level Security (RLS)

**All tables MUST have RLS enabled:**

```sql
-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public users can view published services"
ON public.services FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role IN ('admin', 'editor')
  )
);
```

### Security Checklist

✅ **Required for all tables:**
- [ ] RLS is enabled
- [ ] Public read policy (for published content)
- [ ] Admin write policy (for authenticated users)
- [ ] No direct access to sensitive data

✅ **For user data:**
- [ ] Users can only access their own data
- [ ] Admins can access all data
- [ ] Soft delete instead of hard delete

✅ **For file storage:**
- [ ] Public buckets for public assets only
- [ ] Private buckets for user uploads
- [ ] Size limits enforced (e.g., 5MB)
- [ ] File type validation

### Sensitive Data

**Never store in database:**
- Credit card numbers
- Social security numbers
- Unencrypted passwords
- Personal health information (PHI)

**If you must store sensitive data:**
- Use Supabase Vault for encryption
- Implement column-level encryption
- Audit all access
- Comply with GDPR/CCPA

---

## Authentication

### Password Requirements

Enforce strong passwords:
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, symbols
- No common passwords (e.g., "password123")

### Session Management

```typescript
// Always use secure session configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,      // or sessionStorage for more security
    persistSession: true,        // persist across page reloads
    autoRefreshToken: true,      // auto-refresh before expiry
    detectSessionInUrl: true,    // handle OAuth callbacks
  }
});
```

### Multi-Factor Authentication (MFA)

Consider implementing MFA for admin users:

```typescript
// Enable MFA
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
});

// Verify MFA
const { data, error } = await supabase.auth.mfa.verify({
  factorId: 'factor-id',
  code: '123456',
});
```

---

## Authorization

### Role-Based Access Control (RBAC)

**Roles:**
- `admin` - Full access to all resources
- `editor` - Can create/edit content, no user management
- `viewer` - Read-only access to content

**Implementation:**

```sql
-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own role
CREATE POLICY "Users can view own role"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
```

**Frontend role checks:**

```typescript
// Check if user has required role
const hasRole = (user: User, requiredRole: 'admin' | 'editor' | 'viewer') => {
  // Query user_roles table
  // Return true if user has role
};

// Protect routes
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

---

## API Security

### Rate Limiting

Implement rate limiting on Supabase:

```sql
-- Example: Limit lead submissions to 5 per hour per IP
CREATE TABLE public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,  -- IP address or user ID
  action text NOT NULL,      -- 'submit_lead', 'login', etc.
  count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  UNIQUE(identifier, action, window_start)
);

-- Clean up old rate limit records
CREATE OR REPLACE FUNCTION clean_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;
```

### Input Validation

**Always validate and sanitize user input:**

```typescript
// Use Zod for schema validation
import { z } from 'zod';

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  message: z.string().max(1000),
});

// Validate before submission
const validateLead = (data: unknown) => {
  return leadSchema.parse(data);
};
```

### CORS Configuration

Supabase handles CORS automatically. For custom APIs:

```typescript
// Allow only your domain
const corsOptions = {
  origin: ['https://yourdomain.com', 'https://preview--vedic-design-view.lovable.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
```

---

## Frontend Security

### XSS Prevention

**Always sanitize user-generated content:**

```typescript
// Use DOMPurify for HTML sanitization
import DOMPurify from 'dompurify';

const SafeHTML = ({ html }: { html: string }) => {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};
```

### CSRF Protection

Supabase handles CSRF tokens automatically. For custom forms:

```typescript
// Include CSRF token in forms
<input type="hidden" name="_csrf" value={csrfToken} />
```

### Content Security Policy (CSP)

Add CSP headers to your hosting platform:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co;
```

### Secure Dependencies

**Regularly audit dependencies:**

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

---

## Incident Response

### If a Security Breach Occurs

1. **Contain the breach**
   - Immediately revoke compromised credentials
   - Disable affected user accounts
   - Take affected systems offline if necessary

2. **Assess the damage**
   - Review Supabase logs for unauthorized access
   - Identify what data was accessed/modified
   - Determine the scope of the breach

3. **Notify stakeholders**
   - Inform affected users
   - Report to relevant authorities (if required by law)
   - Document the incident

4. **Remediate**
   - Rotate all credentials
   - Patch vulnerabilities
   - Update security policies
   - Implement additional monitoring

5. **Post-mortem**
   - Conduct a thorough review
   - Document lessons learned
   - Update security procedures
   - Train team on new policies

### Monitoring

**Enable Supabase logging:**
- Go to Supabase Dashboard → Logs
- Review Auth logs regularly
- Set up alerts for suspicious activity

**Monitor for:**
- Failed login attempts
- Unusual API usage patterns
- Large data exports
- Privilege escalation attempts

---

## Security Contacts

**Project Security Lead**: [Your Name/Email]

**Supabase Security**: security@supabase.io

**Reporting Vulnerabilities**: Please report security issues to [your-security-email] or via GitHub Security Advisories.

---

## Additional Resources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

---

**Last Updated**: 2025-01-06
**Version**: 1.0.0
