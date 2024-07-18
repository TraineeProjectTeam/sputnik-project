import { create } from 'zustand';
import { IProduct } from '@/shared/libs/types';
import { getProductsRequest } from '../api/api';

interface IProductListStore {
  products: IProduct[];
  isLoading: boolean;
  getProducts: () => void;
}

export const useProductListStore = create<IProductListStore>((set) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    try {
      set({ isLoading: true });
      const data = await getProductsRequest();
      set({ products: data });
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
