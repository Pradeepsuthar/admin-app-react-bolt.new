import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { LeadForm } from '../components/leads/LeadForm';
import { LeadActions } from '../components/leads/LeadActions';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useLeadStore } from '../store/leadStore';
import { LeadFormData } from '../types/lead';

export const Leads: React.FC = () => {
  const { leads, addLead, updateLead, deleteLead } = useLeadStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [editingLead, setEditingLead] = React.useState<number | null>(null);
  const [deletingLead, setDeletingLead] = React.useState<number | null>(null);

  const handleAdd = (data: LeadFormData) => {
    addLead(data);
  };

  const handleEdit = (data: LeadFormData) => {
    if (editingLead !== null) {
      updateLead(editingLead, data);
      setEditingLead(null);
    }
  };

  const handleDelete = () => {
    if (deletingLead !== null) {
      deleteLead(deletingLead);
      setDeletingLead(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'info';
      case 'In Progress':
        return 'warning';
      case 'Qualified':
        return 'success';
      case 'Lost':
        return 'error';
      default:
        return 'default';
    }
  };

  const editingLeadData = editingLead
    ? leads.find((lead) => lead.id === editingLead)
    : undefined;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" component="h1">
          Leads
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Lead
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Chip
                    label={lead.status}
                    color={getStatusColor(lead.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <LeadActions
                    onEdit={() => setEditingLead(lead.id)}
                    onDelete={() => setDeletingLead(lead.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LeadForm
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAdd}
        title="Add New Lead"
      />

      <LeadForm
        open={editingLead !== null}
        onClose={() => setEditingLead(null)}
        onSubmit={handleEdit}
        initialData={editingLeadData}
        title="Edit Lead"
      />

      <ConfirmDialog
        open={deletingLead !== null}
        onClose={() => setDeletingLead(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
      />
    </div>
  );
};