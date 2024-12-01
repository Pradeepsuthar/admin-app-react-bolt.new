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
import { MasterConfig, MasterItem } from '../../types/master';

interface MasterFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  config: MasterConfig;
  initialData?: MasterItem;
  title: string;
}

export const MasterForm: React.FC<MasterFormProps> = ({
  open,
  onClose,
  onSubmit,
  config,
  initialData,
  title,
}) => {
  // Initialize form data with empty values for all fields
  const getInitialFormData = () => {
    const data: Record<string, any> = {};
    config.fields.forEach((field) => {
      data[field.name] = '';
    });
    return data;
  };

  const [formData, setFormData] = React.useState<Record<string, any>>(getInitialFormData());
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (open) {
      // When opening the form, initialize with either initial data or empty values
      setFormData(initialData ? { ...getInitialFormData(), ...initialData } : getInitialFormData());
      setErrors({});
    }
  }, [initialData, open, config.fields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    config.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.validation) {
        const error = field.validation(formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    setFormData(getInitialFormData());
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown; name?: string }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {config.fields.map((field) => {
              if (field.type === 'select') {
                return (
                  <Select
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    options={field.options || []}
                    required={field.required}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  />
                );
              }
              return (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  multiline={field.type === 'textarea'}
                  rows={field.type === 'textarea' ? 4 : undefined}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              );
            })}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};