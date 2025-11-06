import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { submitLead, getLeads, updateLeadStatus } from "../adapters/leads";
import type { LeadInput, Lead } from "../adapters/leads";

// ========================================
// PUBLIC LEAD SUBMISSION
// ========================================
export const useSubmitLead = () => {
  return useMutation({
    mutationFn: (input: LeadInput) => submitLead(input),
  });
};

// ========================================
// ADMIN LEAD MANAGEMENT
// ========================================
export const useLeads = (filters?: { status?: string; source?: string }) => {
  return useQuery({
    queryKey: ["leads", filters],
    queryFn: () => getLeads(filters),
    staleTime: 30 * 1000, // 30 seconds - more frequent updates for admin
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      id, 
      status, 
      notes 
    }: { 
      id: string; 
      status: Lead['status']; 
      notes?: string 
    }) => updateLeadStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
};
