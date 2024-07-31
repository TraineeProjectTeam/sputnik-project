import { create } from 'zustand';
import { IProduct } from '@/shared/libs/types';
import { getProductsRequest } from '../api/api';

interface IProductStore {
  products: IProduct[];
  isLoading: boolean;
  getProducts: () => Promise<IProduct[]>;
}

export const useProductStore = create<IProductStore>((set) => ({
  products: [],
  isLoading: false,
  getProducts: async () => {
    try {
      set({ isLoading: true });
      const data = await getProductsRequest();
      set({ products: data });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
}));
