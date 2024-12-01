import { Building2, MapPin, Tags } from 'lucide-react';
import { MasterConfig } from '../types/master';

export const masterConfigs: Record<string, MasterConfig> = {
  brand: {
    name: 'brand',
    label: 'Brand Master',
    icon: <Building2 />,
    fields: [
      {
        name: 'name',
        label: 'Brand Name',
        type: 'text',
        required: true,
        validation: (value) => 
          !value ? 'Brand name is required' : undefined,
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
        required: true,
      },
    ],
    columns: [
      { field: 'name', label: 'Brand Name' },
      { field: 'status', label: 'Status' },
    ],
  },
  city: {
    name: 'city',
    label: 'City Master',
    icon: <MapPin />,
    fields: [
      {
        name: 'name',
        label: 'City Name',
        type: 'text',
        required: true,
      },
      {
        name: 'state',
        label: 'State',
        type: 'text',
        required: true,
      },
      {
        name: 'country',
        label: 'Country',
        type: 'text',
        required: true,
      },
      {
        name: 'pincode',
        label: 'PIN Code',
        type: 'text',
      },
    ],
    columns: [
      { field: 'name', label: 'City Name' },
      { field: 'state', label: 'State' },
      { field: 'country', label: 'Country' },
    ],
  },
  status: {
    name: 'status',
    label: 'Status Master',
    icon: <Tags />,
    fields: [
      {
        name: 'name',
        label: 'Status Name',
        type: 'text',
        required: true,
      },
      {
        name: 'code',
        label: 'Status Code',
        type: 'text',
        required: true,
      },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: 'lead', label: 'Lead' },
          { value: 'order', label: 'Order' },
          { value: 'payment', label: 'Payment' },
        ],
        required: true,
      },
    ],
    columns: [
      { field: 'name', label: 'Status Name' },
      { field: 'code', label: 'Status Code' },
      { field: 'category', label: 'Category' },
    ],
  },
};