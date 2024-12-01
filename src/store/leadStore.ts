import { create } from 'zustand';
import { Lead, LeadFormData } from '../types/lead';

interface LeadState {
  leads: Lead[];
  addLead: (lead: LeadFormData) => void;
  updateLead: (id: number, lead: LeadFormData) => void;
  deleteLead: (id: number) => void;
  getLead: (id: number) => Lead | undefined;
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [
    {
      id: 1,
      name: 'John Doe',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      status: 'New',
    },
    {
      id: 2,
      name: 'Jane Smith',
      company: 'Design Co',
      email: 'jane@designco.com',
      status: 'In Progress',
    },
  ],

  addLead: (leadData) => {
    set((state) => ({
      leads: [
        ...state.leads,
        {
          ...leadData,
          id: Math.max(0, ...state.leads.map((l) => l.id)) + 1,
        },
      ],
    }));
  },

  updateLead: (id, leadData) => {
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...leadData } : lead
      ),
    }));
  },

  deleteLead: (id) => {
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id),
    }));
  },

  getLead: (id) => {
    return get().leads.find((lead) => lead.id === id);
  },
}));