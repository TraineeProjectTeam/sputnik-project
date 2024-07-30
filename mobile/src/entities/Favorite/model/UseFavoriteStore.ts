import { create } from 'zustand';
import { IProduct } from '@/shared/libs/types';
import { addToFavorite, deleteFavorite, getFavorites } from '../api/api';
import { useUserStore } from '@/entities/user';

interface IUseFavoriteStore {
  isLoading: boolean;
  favorites: IProduct[];
  currentPage: number;
  pagination: Pagination;
  getFavorites: () => Promise<IProduct[]>;
  refreshFavorites: () => Promise<IProduct[]>;
  addToFavorite: (id: string) => Promise<IProduct>;
  deleteFavorite: (id: string) => Promise<IProduct>;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const useFavoriteStore = create<IUseFavoriteStore>((set, get) => ({
  isLoading: false,
  favorites: [],
  currentPage: 0,
  pagination: {} as Pagination,
  getFavorites: async () => {
    try {
      set({ isLoading: true });
      set({ currentPage: get().currentPage + 1 });
      const data = await getFavorites(get().currentPage);
      set({ favorites: [...get().favorites, ...data.products], pagination: data.pagination });
      return data.products;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
  refreshFavorites: async () => {
    try {
      set({ currentPage: 1 });
      const data = await getFavorites(get().currentPage);
      set({ favorites: data.products, pagination: data.pagination });
      return data.products;
    } catch {
      throw new Error();
    }
  },
  addToFavorite: async (id) => {
    try {
      return await addToFavorite(id);
    } catch {
      throw new Error();
    }
  },
  deleteFavorite: async (id) => {
    try {
      return await deleteFavorite(id);
    } catch {
      throw new Error();
    }
  },
}));
