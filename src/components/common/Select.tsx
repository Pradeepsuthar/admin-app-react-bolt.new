import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps as MuiSelectProps,
} from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, 'variant'> {
  label: string;
  options: Option[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <MuiSelect variant="outlined" label={label} {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};