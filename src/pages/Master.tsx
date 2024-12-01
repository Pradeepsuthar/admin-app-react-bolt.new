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
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { MasterForm } from '../components/master/MasterForm';
import { LeadActions } from '../components/leads/LeadActions';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useMasterStore } from '../store/masterStore';
import { masterConfigs } from '../config/masterConfigs';

export const Master: React.FC = () => {
  const { type = 'brand' } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<number | null>(null);
  const [deletingItem, setDeletingItem] = React.useState<number | null>(null);

  const { items, addItem, updateItem, deleteItem } = useMasterStore();
  const config = masterConfigs[type];
  const currentItems = items[type] || [];

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/master/${newValue}`);
  };

  const handleAdd = (data: any) => {
    addItem(type, data);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (data: any) => {
    if (editingItem !== null) {
      updateItem(type, editingItem, data);
      setEditingItem(null);
    }
  };

  const handleDelete = () => {
    if (deletingItem !== null) {
      deleteItem(type, deletingItem);
      setDeletingItem(null);
    }
  };

  if (!config) {
    return <Typography>Invalid master type</Typography>;
  }

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={type} onChange={handleTabChange}>
          {Object.values(masterConfigs).map((config) => (
            <Tab
              key={config.name}
              value={config.name}
              label={config.label}
              icon={config.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" component="h1">
          {config.label}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus />}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add {config.label}
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {config.columns.map((column) => (
                <TableCell key={column.field}>{column.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                {config.columns.map((column) => (
                  <TableCell key={column.field}>
                    {column.render
                      ? column.render(item[column.field])
                      : item[column.field]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <LeadActions
                    onEdit={() => setEditingItem(item.id)}
                    onDelete={() => setDeletingItem(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MasterForm
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAdd}
        config={config}
        title={`Add ${config.label}`}
      />

      <MasterForm
        open={editingItem !== null}
        onClose={() => setEditingItem(null)}
        onSubmit={handleEdit}
        config={config}
        initialData={currentItems.find((item) => item.id === editingItem)}
        title={`Edit ${config.label}`}
      />

      <ConfirmDialog
        open={deletingItem !== null}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        title={`Delete ${config.label}`}
        message={`Are you sure you want to delete this ${config.label.toLowerCase()}? This action cannot be undone.`}
      />
    </div>
  );
};