export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  status: 'New' | 'In Progress' | 'Qualified' | 'Lost';
  phone?: string;
  notes?: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  email: string;
  status: Lead['status'];
  phone?: string;
  notes?: string;
}