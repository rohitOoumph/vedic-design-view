import { supabase } from "@/integrations/supabase/client";
import type { Lead } from "../types";

export type { Lead };

export interface LeadInput {
  name: string;
  email?: string;
  phone?: string;
  project_type?: string;
  message?: string;
  source?: string;
}

// ========================================
// LEAD SUBMISSION (Public)
// ========================================
export async function submitLead(input: LeadInput): Promise<void> {
  const { error } = await supabase
    .from("leads")
    .insert({
      ...input,
      source: input.source || 'website'
    });
  
  if (error) throw error;
}

// ========================================
// LEAD MANAGEMENT (Admin only)
// ========================================
export async function getLeads(filters?: {
  status?: string;
  source?: string;
}): Promise<Lead[]> {
  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (filters?.status) {
    query = query.eq("status", filters.status);
  }
  
  if (filters?.source) {
    query = query.eq("source", filters.source);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
  
  return (data ?? []) as Lead[];
}

export async function updateLeadStatus(
  id: string, 
  status: Lead['status'], 
  notes?: string
): Promise<Lead | null> {
  const updateData: Partial<Lead> = { status };
  if (notes) updateData.notes = notes;
  
  const { data, error } = await supabase
    .from("leads")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Lead;
}
