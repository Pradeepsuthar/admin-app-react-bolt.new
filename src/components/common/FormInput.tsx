import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};