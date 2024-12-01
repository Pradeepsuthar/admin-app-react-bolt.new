import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import { FormInput } from '../common/FormInput';
import { Select } from '../common/Select';
import { LeadFormData } from '../../types/lead';

interface LeadFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LeadFormData) => void;
  initialData?: LeadFormData;
  title: string;
}

const defaultFormData: LeadFormData = {
  name: '',
  company: '',
  email: '',
  status: 'New',
  phone: '',
  notes: '',
};

const statusOptions = [
  { value: 'New', label: 'New' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Lost', label: 'Lost' },
];

export const LeadForm: React.FC<LeadFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [formData, setFormData] = React.useState<LeadFormData>(defaultFormData);

  React.useEffect(() => {
    // Reset form when dialog opens/closes
    setFormData(initialData || defaultFormData);
  }, [open, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData);
    onClose();
  };

  const handleClose = () => {
    setFormData(defaultFormData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormInput
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
            <Select
              label="Status"
              name="status"
              value={formData.status || 'New'}
              onChange={handleChange}
              options={statusOptions}
            />
            <FormInput
              label="Notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};