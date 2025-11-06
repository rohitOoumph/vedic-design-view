// CMS Type Definitions
export interface SiteSettings {
  id: string;
  brand_name: string;
  address?: string;
  phone?: string;
  email?: string;
  hero_headline?: string;
  hero_subtext?: string;
  hero_cta_label?: string;
  facebook_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  created_at: string;
  updated_at: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  order_index: number;
  is_visible: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_desc?: string;
  full_description?: string;
  icon_name?: string;
  is_featured: boolean;
  order_index: number;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category?: 'Residential' | 'Corporate' | 'Architecture' | 'Turnkey' | 'Coworking' | 'Temple';
  short_desc?: string;
  full_description?: string;
  cover_image_url?: string;
  media_gallery?: string[];
  model_3d_url?: string;
  featured: boolean;
  order_index: number;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  designation?: string;
  company?: string;
  project_type?: string;
  quote: string;
  avatar_url?: string;
  rating?: number;
  order_index: number;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order_index: number;
  status: 'draft' | 'published';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  project_type?: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
}
