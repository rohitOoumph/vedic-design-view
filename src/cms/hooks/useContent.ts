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

// Optimized query options for better performance
const queryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
  gcTime: 10 * 60 * 1000, // 10 minutes - garbage collection
  refetchOnWindowFocus: false, // Prevent unnecessary refetches
  refetchOnMount: false, // Only refetch if stale
};

// Settings and nav links change rarely, cache longer
const staticQueryOptions = {
  staleTime: 15 * 60 * 1000, // 15 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// ========================================
// SITE SETTINGS
// ========================================
export const useSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
    ...staticQueryOptions,
  });
};

// ========================================
// NAVIGATION
// ========================================
export const useNavLinks = () => {
  return useQuery({
    queryKey: ["nav-links"],
    queryFn: getNavLinks,
    ...staticQueryOptions,
  });
};

// ========================================
// SERVICES
// ========================================
export const useServices = (options?: { featured?: boolean }) => {
  return useQuery({
    queryKey: ["services", options],
    queryFn: () => getServices(options),
    ...queryOptions,
  });
};

export const useServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug(slug),
    ...queryOptions,
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
    ...queryOptions,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    ...queryOptions,
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
    ...queryOptions,
  });
};

// ========================================
// FAQS
// ========================================
export const useFAQs = (category?: string) => {
  return useQuery({
    queryKey: ["faqs", category],
    queryFn: () => getFAQs(category),
    ...queryOptions,
  });
};
