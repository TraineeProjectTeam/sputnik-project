import { AxiosPromise } from 'axios';
import { api } from 'shared/api';

const BASE_URL = '/file-upload';

export const addSingleFileRequest = async (
  formData: FormData,
): AxiosPromise<{ image_url: string; message: string }> => {
  const response = await api.post(`${BASE_URL}/single`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const addMultiplyFileRequest = async (
  formData: FormData,
): AxiosPromise<{ image1_url: string; image2_url: string; message: string }> => {
  const response = await api.post(`${BASE_URL}/many`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const deleteFileRequest = async (
  id: string,
): AxiosPromise<{ image_url: string; message: string }> => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response;
};
