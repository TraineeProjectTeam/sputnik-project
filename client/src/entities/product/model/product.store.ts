import { create } from 'zustand';
import { IProduct } from './product.types';
import { api } from 'shared/api';

interface IProductsStore {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  getProducts: (category: string) => Promise<IProduct[]>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useProductsStore = create<IProductsStore>((set) => ({
  products: [],
  loading: false,
  getProducts: async (category) => {
    try {
      set({ loading: true });
      const { data } = await api.post<IProduct[]>('/products', { category });
      set({ products: data });
      return data;
    } catch (error: any) {
      set({ products: [] });
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));
