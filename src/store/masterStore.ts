import { create } from 'zustand';
import { MasterState, MasterItem } from '../types/master';

export const useMasterStore = create<MasterState>((set, get) => ({
  items: {
    brand: [
      { id: 1, name: 'Brand A', code: 'BA', status: 'active' },
      { id: 2, name: 'Brand B', code: 'BB', status: 'inactive' },
    ],
    city: [
      { id: 1, name: 'New York', state: 'NY', country: 'USA' },
      { id: 2, name: 'London', state: 'England', country: 'UK' },
    ],
    status: [
      { id: 1, name: 'Active', code: 'ACT', category: 'lead' },
      { id: 2, name: 'Pending', code: 'PEN', category: 'order' },
    ],
  },

  addItem: (masterType, itemData) => {
    set((state) => {
      const items = state.items[masterType] || [];
      const newId = Math.max(0, ...items.map((item) => item.id)) + 1;
      return {
        items: {
          ...state.items,
          [masterType]: [...items, { ...itemData, id: newId }],
        },
      };
    });
  },

  updateItem: (masterType, id, itemData) => {
    set((state) => ({
      items: {
        ...state.items,
        [masterType]: (state.items[masterType] || []).map((item) =>
          item.id === id ? { ...item, ...itemData } : item
        ),
      },
    }));
  },

  deleteItem: (masterType, id) => {
    set((state) => ({
      items: {
        ...state.items,
        [masterType]: (state.items[masterType] || []).filter(
          (item) => item.id !== id
        ),
      },
    }));
  },

  getItem: (masterType, id) => {
    const state = get();
    return (state.items[masterType] || []).find((item) => item.id === id);
  },
}));