import { ReactNode } from 'react';

export interface MasterField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string | number; label: string }[];
  validation?: (value: any) => string | undefined;
}

export interface MasterConfig {
  name: string;
  label: string;
  icon: ReactNode;
  fields: MasterField[];
  columns: Array<{
    field: string;
    label: string;
    render?: (value: any) => ReactNode;
  }>;
}

export interface MasterItem {
  id: number;
  [key: string]: any;
}

export interface MasterState {
  items: Record<string, MasterItem[]>;
  addItem: (masterType: string, item: Omit<MasterItem, 'id'>) => void;
  updateItem: (masterType: string, id: number, item: Partial<MasterItem>) => void;
  deleteItem: (masterType: string, id: number) => void;
  getItem: (masterType: string, id: number) => MasterItem | undefined;
}