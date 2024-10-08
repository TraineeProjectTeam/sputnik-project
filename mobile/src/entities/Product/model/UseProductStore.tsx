import { createWithEqualityFn } from 'zustand/traditional';
import { ICharacteristic, IFilters, IProduct } from '@/shared/libs/types';
import { getCategoriesRequest, getCharacteristicsRequest, getProductsRequest } from '../api/api';
import { immer } from 'zustand/middleware/immer';

interface IProductStore {
  products: IProduct[];
  categories: string[];
  filters: IFilters;
  cachedCategory?: string;
  cachedFilters: IFilters;
  characteristics: ICharacteristic[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  isLoadingChar: boolean;
  prices: { max: number; min: number };
  getCategories: () => Promise<string[]>;
  getCharacteristics: (category?: string) => Promise<ICharacteristic[]>;
  getProducts: (filters: IFilters) => Promise<IProduct[]>;
  onEndReached: () => Promise<IProduct[]>;
  refreshProducts: () => Promise<IProduct[]>;
  reset: () => void;
  resetFilters: () => void;
  resetCache: () => void;
}
const initialFiltersState: IFilters = {
  characteristics: [],
  rating: 0,
  min: 0,
  max: 10000000,
};

const initialCachedFiltersState: IFilters = {
  characteristics: [],
  rating: 0,
  min: 0,
  max: 0,
};

export const useProductStore = createWithEqualityFn<IProductStore>()(
  immer((set, get) => ({
    products: [],
    categories: [],
    filters: initialFiltersState,
    cachedCategory: '',
    cachedFilters: initialCachedFiltersState,
    characteristics: [],
    currentPage: 0,
    totalPages: 0,
    isLoading: true,
    isLoadingChar: false,
    prices: {
      max: 0,
      min: 0,
    },
    getCategories: async () => {
      try {
        set({ isLoading: true });
        const data = await getCategoriesRequest();
        set({ categories: data });
        return data;
      } catch {
        throw new Error();
      } finally {
        set({ isLoading: false });
      }
    },
    getProducts: async (filters) => {
      try {
        set((state) => {
          state.isLoading = true;
          state.currentPage = 1;
          state.filters = {
            ...state.filters,
            ...filters,
          };
        });
        const data = await getProductsRequest(get().filters, get().currentPage);
        set({
          totalPages: data.totalPages,
          products: data.products,
        });
        return data.products;
      } catch {
        throw new Error();
      } finally {
        set({ isLoading: false });
      }
    },
    onEndReached: async () => {
      try {
        set((state) => {
          state.isLoading = true;
          state.currentPage += 1;
        });
        const data = await getProductsRequest(get().filters, get().currentPage);
        set((state) => {
          state.totalPages = data.totalPages;
          state.products = [...state.products, ...data.products];
        });
        return data.products;
      } catch {
        throw new Error();
      } finally {
        set({ isLoading: false });
      }
    },
    refreshProducts: async () => {
      try {
        set((state) => {
          state.isLoading = true;
          state.currentPage = 1;
        });
        const data = await getProductsRequest(get().filters, get().currentPage);
        set({ totalPages: data.totalPages, products: data.products });
        return data.products;
      } catch {
        throw new Error();
      } finally {
        set({ isLoading: false });
      }
    },
    getCharacteristics: async (category) => {
      try {
        set({ isLoadingChar: true });
        const data = await getCharacteristicsRequest(category);
        set((state) => {
          state.characteristics = data.characteristics;
          state.prices = data.prices;
          state.cachedCategory = category;
          state.filters = {
            ...state.filters,
            max: data.prices.max,
            min: data.prices.min,
            category: state.filters.category,
          };
        });
        return data.characteristics;
      } catch {
        throw new Error();
      } finally {
        set({ isLoadingChar: false });
      }
    },
    reset: () => {
      set({
        filters: initialFiltersState,
        products: [],
        characteristics: [],
        cachedFilters: initialCachedFiltersState,
      });
    },
    resetFilters: () => {
      if (
        get().filters.characteristics.length > 0 ||
        get().filters.rating ||
        get().prices.max != get().filters.max ||
        get().prices.min != get().filters.min
      ) {
        set((state) => {
          state.cachedFilters = state.filters;
        });
      }
      set((state) => {
        state.filters = {
          ...state.filters,
          ...initialFiltersState,
          category: state.filters.category,
        };
      });
    },
    resetCache: () => {
      set({ cachedFilters: initialCachedFiltersState });
    },
  })),
);
