import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
} from '@mui/material';
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { masterConfigs } from '../../config/masterConfigs';

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  requiredPermissions?: string[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Home />,
  },
  {
    title: 'Master',
    icon: <Settings />,
    children: Object.values(masterConfigs).map((config) => ({
      title: config.label,
      path: `/master/${config.name}`,
      icon: config.icon,
      requiredPermissions: ['all'],
    })),
  },
  {
    title: 'Leads',
    path: '/leads',
    icon: <Users />,
    requiredPermissions: ['manage_leads'],
  },
];

export const Sidebar: React.FC = () => {
  const [open, setOpen] = React.useState<Record<string, boolean>>({
    Master: true, // Keep master menu open by default
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const handleClick = (title: string) => {
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const hasPermission = (item: MenuItem) => {
    if (!item.requiredPermissions) return true;
    if (!user) return false;
    return (
      user.role === 'admin' ||
      item.requiredPermissions.some((permission) =>
        user.permissions.includes(permission)
      )
    );
  };

  const isSelected = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem) => {
    if (!hasPermission(item)) return null;

    if (item.children) {
      return (
        <React.Fragment key={item.title}>
          <ListItem
            button
            onClick={() => handleClick(item.title)}
            sx={{
              pl: 2,
              bgcolor: open[item.title] ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {open[item.title] ? <ChevronDown /> : <ChevronRight />}
          </ListItem>
          <Collapse in={open[item.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => renderMenuItem(child))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <ListItem
        button
        key={item.title}
        onClick={() => item.path && navigate(item.path)}
        sx={{
          pl: item.path?.includes('/') ? 4 : 2,
          bgcolor: isSelected(item.path)
            ? 'rgba(25, 118, 210, 0.08)'
            : 'transparent',
          '&:hover': {
            bgcolor: 'rgba(25, 118, 210, 0.04)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: isSelected(item.path) ? 'primary.main' : 'inherit',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          sx={{
            '& .MuiListItemText-primary': {
              color: isSelected(item.path) ? 'primary.main' : 'inherit',
              fontWeight: isSelected(item.path) ? 500 : 400,
            },
          }}
        />
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <DrawerHeader>
        <h1>Admin Dashboard</h1>
      </DrawerHeader>
      <List>{menuItems.map((item) => renderMenuItem(item))}</List>
    </Drawer>
  );
};