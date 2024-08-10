import { api } from 'shared/api';

const BASE_URL = '/file-upload';

export const addSingleFileRequest = async (url: string) => {
  const response = api.post(
    `${BASE_URL}/single`,
    { image: url },
    {
      headers: {
        authorization: 'authorization-text',
      },
    },
  );
  return response;
};

export const addMultyFileRequest = async (url1: string, url2: string) => {
  const response = api.post(
    `${BASE_URL}/many`,
    { image1: url1, image2: url2 },
    {
      headers: {
        authorization: 'authorization-text',
      },
    },
  );
  return response;
};

export const deleteFileRequest = async (id: string) => {
  const response = api.delete(`${BASE_URL}/${id}`);
  return response;
};
