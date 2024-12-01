import { create } from 'zustand';
import { AuthState, LoginCredentials } from '../types/auth';

// Simulated user data - In real app, this would come from an API
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    permissions: ['all'],
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Manager User',
    role: 'manager',
    permissions: ['view_dashboard', 'manage_leads'],
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials: LoginCredentials) => {
    const user = mockUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));