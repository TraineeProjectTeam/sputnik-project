import { createWithEqualityFn } from 'zustand/traditional';
import { IProduct, IPagination } from '@/shared/libs/types';
import { addToFavorite, deleteFavorite, getFavorites } from '../api/api';

interface IUseFavoriteStore {
  isLoading: boolean;
  favorites: IProduct[];
  favoriteIds: string[];
  currentPage: number;
  pagination: IPagination;
  setFavoriteIds: (ids: string[]) => void;
  getFavorites: () => Promise<IProduct[]>;
  refreshFavorites: () => Promise<IProduct[]>;
  addToFavorite: (id: string) => Promise<IProduct>;
  deleteFavorite: (id: string) => Promise<IProduct>;
  isFavorite: (id: string) => boolean;
  reset: () => void;
}

export const useFavoriteStore = createWithEqualityFn<IUseFavoriteStore>((set, get) => ({
  isLoading: false,
  favorites: [],
  favoriteIds: [],
  currentPage: 0,
  pagination: {} as IPagination,
  setFavoriteIds: (ids) => {
    set({ favoriteIds: ids });
  },
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
      const data = await addToFavorite(id);
      set({ favoriteIds: [data._id, ...get().favoriteIds] });
      return data;
    } catch {
      throw new Error();
    }
  },
  deleteFavorite: async (id) => {
    try {
      const data = await deleteFavorite(id);
      set({ favoriteIds: get().favoriteIds.filter((productId) => productId !== data._id) });
      return data;
    } catch {
      throw new Error();
    }
  },
  isFavorite: (id) => get().favoriteIds?.some((productId) => productId === id),
  reset: () => {
    set({ favorites: [], favoriteIds: [] });
  },
}));
