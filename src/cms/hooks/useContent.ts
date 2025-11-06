import { useQuery } from "@tanstack/react-query";
import {
  getSettings,
  getNavLinks,
  getServices,
  getServiceBySlug,
  getProjects,
  getProjectBySlug,
  getTestimonials,
  getFAQs,
} from "../adapters/content";

// ========================================
// SITE SETTINGS
// ========================================
export const useSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// ========================================
// NAVIGATION
// ========================================
export const useNavLinks = () => {
  return useQuery({
    queryKey: ["nav-links"],
    queryFn: getNavLinks,
    staleTime: 5 * 60 * 1000,
  });
};

// ========================================
// SERVICES
// ========================================
export const useServices = (options?: { featured?: boolean }) => {
  return useQuery({
    queryKey: ["services", options],
    queryFn: () => getServices(options),
    staleTime: 5 * 60 * 1000,
  });
};

export const useServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};

// ========================================
// PROJECTS
// ========================================
export const useProjects = (options?: {
  featured?: boolean;
  category?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["projects", options],
    queryFn: () => getProjects(options),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
};

// ========================================
// TESTIMONIALS
// ========================================
export const useTestimonials = (limit?: number) => {
  return useQuery({
    queryKey: ["testimonials", limit],
    queryFn: () => getTestimonials(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// ========================================
// FAQS
// ========================================
export const useFAQs = (category?: string) => {
  return useQuery({
    queryKey: ["faqs", category],
    queryFn: () => getFAQs(category),
    staleTime: 5 * 60 * 1000,
  });
};
