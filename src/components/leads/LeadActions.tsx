import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';

interface LeadActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const LeadActions: React.FC<LeadActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={onEdit} size="small" color="primary">
          <Edit size={20} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={onDelete} size="small" color="error">
          <Trash2 size={20} />
        </IconButton>
      </Tooltip>
    </>
  );
};