import { type TypeApiError, type TypeApiRequestConfig, type TypeApiResponse } from './types';

export const errorHandler = (err: TypeApiError) => {
  return Promise.reject(err);
};

export const requestHandler = (config: TypeApiRequestConfig) => {
  const headers = config.headers || {};

  return { ...config, headers };
};

export const responseHandler = (res: TypeApiResponse) => res;