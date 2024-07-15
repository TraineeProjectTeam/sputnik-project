import { create } from 'zustand';
import { categoriesData } from './category.mock';
import { ICategory } from './category.types';
import { TFunction } from 'i18next';

export interface ICategoriesStore {
  categories: (t: TFunction) => ICategory[] | ICategory[];
  selectedCategory: ICategory | null;
  setCategories: (categories: (t: TFunction) => ICategory[] | ICategory[]) => void;
  setSelectedCategory: (category: ICategory) => void;
}

export const useCategoriesStore = create<ICategoriesStore>((set) => ({
  categories: categoriesData,
  selectedCategory: null,
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
