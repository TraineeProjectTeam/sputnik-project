import { api } from '@/shared/api';
import { IReview, IUpdateReview } from '@/shared/libs/types';
import { ICreateReview } from '../model/useReviewStore';

export const getReviews = async (params: string[]): Promise<IReview[]> => {
  const response = await api.post('/reviews', { data: params });
  return response.data;
};

export const createReview = async (params: ICreateReview): Promise<IReview> => {
  const response = await api.post('/reviews/create', params);
  return response.data;
};

export const deleteReview = async (id: string): Promise<IReview> => {
  const response = await api.delete(`/reviews/${id}`);
  return response.data;
};

export const updateReview = async (id: string, params: IUpdateReview): Promise<IReview> => {
  const response = await api.put(`/reviews/${id}`, params);
  return response.data;
};
