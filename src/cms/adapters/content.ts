import { supabase } from "@/integrations/supabase/client";
import type { SiteSettings, NavLink, Service, Project, Testimonial, FAQ } from "../types";

// ========================================
// SITE SETTINGS
// ========================================
export async function getSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .single();
  
  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
  
  return data;
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .update(settings)
    .eq("id", settings.id!)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ========================================
// NAVIGATION
// ========================================
export async function getNavLinks(): Promise<NavLink[]> {
  const { data, error } = await supabase
    .from("nav_links")
    .select("*")
    .eq("is_visible", true)
    .order("order_index");
  
  if (error) {
    console.error("Error fetching nav links:", error);
    return [];
  }
  
  return data ?? [];
}

// ========================================
// SERVICES
// ========================================
export async function getServices(options?: { featured?: boolean }): Promise<Service[]> {
  let query = supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("order_index");
  
  if (options?.featured) {
    query = query.eq("is_featured", true);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }
  
  return (data ?? []) as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  
  if (error) {
    console.error("Error fetching service:", error);
    return null;
  }
  
  return data as Service;
}

// ========================================
// PROJECTS
// ========================================
export async function getProjects(options?: { 
  featured?: boolean; 
  category?: string;
  limit?: number;
}): Promise<Project[]> {
  let query = supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("order_index");
  
  if (options?.featured) {
    query = query.eq("featured", true);
  }
  
  if (options?.category) {
    query = query.eq("category", options.category);
  }
  
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
  
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  
  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }
  
  return data as Project;
}

// ========================================
// TESTIMONIALS
// ========================================
export async function getTestimonials(limit?: number): Promise<Testimonial[]> {
  let query = supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("order_index");
  
  if (limit) {
    query = query.limit(limit);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  
  return (data ?? []) as Testimonial[];
}

// ========================================
// FAQS
// ========================================
export async function getFAQs(category?: string): Promise<FAQ[]> {
  let query = supabase
    .from("faqs")
    .select("*")
    .eq("status", "published")
    .order("order_index");
  
  if (category) {
    query = query.eq("category", category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
  
  return (data ?? []) as FAQ[];
}
