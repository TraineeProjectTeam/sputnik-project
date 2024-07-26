import { create } from 'zustand';
import { IReview, IUpdateReview } from '@/shared/libs/types';
import { createReview, deleteReview, getReviews, updateReview } from '../api/api';

interface IUseReviewsStore {
  isLoading: boolean;
  reviews: IReview[];
  getReviews: (formData: string[]) => Promise<IReview[]>;
  createReview: (formData: ICreateReview) => Promise<IReview>;
  updateReview: (id: string, formData: IUpdateReview) => Promise<IReview>;
  deleteReview: (id: string) => Promise<IReview>;
}

export interface ICreateReview {
  customer_fullname: string;
  product_id: string;
  customer_id: string;
  rating: number;
  body: string;
}

export const useReviewsStore = create<IUseReviewsStore>((set, get) => ({
  isLoading: false,
  reviews: [],
  getReviews: async (formData) => {
    try {
      set({ isLoading: true });
      const data = await getReviews(formData);
      set({ reviews: data });
      return data;
    } catch {
      throw new Error();
    } finally {
      set({ isLoading: false });
    }
  },
  createReview: async (formData) => {
    try {
      const data = await createReview(formData);
      return data;
    } catch {
      throw new Error();
    }
  },
  updateReview: async (id, formData) => {
    try {
      const data = await updateReview(id, formData);
      set({
        reviews: get().reviews.map((review) => (data._id === review._id ? { ...data } : review)),
      });
      return data;
    } catch {
      throw new Error();
    }
  },
  deleteReview: async (id) => {
    try {
      const data = await deleteReview(id);
      set({ reviews: get().reviews.filter((review) => review._id !== id) });
      return data;
    } catch {
      throw new Error();
    }
  },
}));
